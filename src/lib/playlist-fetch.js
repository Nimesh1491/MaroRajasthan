// Reading a public YouTube playlist through the same internal endpoint the site
// itself uses, so no API key is needed.
//
// Deliberately free of any Next.js import, so this can be exercised by plain
// Node (the data-integrity script) as well as by the app. The caching wrapper
// lives next door in playlist.js.

const KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"; // public web client key
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const CTX = {
  client: { clientName: "WEB", clientVersion: "2.20240101.00.00", hl: "en", gl: "IN" },
};

async function browse(body) {
  const r = await fetch(
    `https://www.youtube.com/youtubei/v1/browse?key=${KEY}&prettyPrint=false`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "user-agent": UA },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );
  if (!r.ok) throw new Error(`youtube browse ${r.status}`);
  return r.json();
}

function textOf(n) {
  if (!n) return undefined;
  if (typeof n === "string") return n;
  if (n.content) return n.content;
  if (n.simpleText) return n.simpleText;
  if (Array.isArray(n.runs)) return n.runs.map((r) => r.text).join("");
  return undefined;
}

function deepFind(node, pred, depth = 0) {
  if (!node || typeof node !== "object" || depth > 18) return null;
  if (pred(node)) return node;
  for (const k in node) {
    const hit = deepFind(node[k], pred, depth + 1);
    if (hit) return hit;
  }
  return null;
}

// YouTube returns playlist rows as lockupViewModel now; older responses used
// playlistVideoRenderer. Both are handled so a rollback on their side does not
// silently empty the station.
function collect(node, out, seen, depth = 0) {
  if (!node || typeof node !== "object" || depth > 20) return;

  const lock = node.lockupViewModel;
  if (lock?.contentId) {
    if (!lock.contentType || /VIDEO/.test(lock.contentType)) {
      if (!seen.has(lock.contentId)) {
        seen.add(lock.contentId);
        const badge = deepFind(lock, (n) => n.thumbnailBadgeViewModel?.text);
        const rows =
          lock.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows?.flatMap(
            (r) => (r.metadataParts || []).map((p) => textOf(p.text)).filter(Boolean)
          ) || [];
        out.push({
          videoId: lock.contentId,
          title: textOf(lock.metadata?.lockupMetadataViewModel?.title),
          owner: rows[0],
          length: badge?.thumbnailBadgeViewModel?.text,
        });
      }
    }
    return;
  }

  const pvr = node.playlistVideoRenderer;
  if (pvr?.videoId) {
    if (!seen.has(pvr.videoId)) {
      seen.add(pvr.videoId);
      out.push({
        videoId: pvr.videoId,
        title: textOf(pvr.title),
        owner: textOf(pvr.shortBylineText),
        length: textOf(pvr.lengthText),
      });
    }
    return;
  }

  for (const k in node) collect(node[k], out, seen, depth + 1);
}

function findToken(node, depth = 0) {
  if (!node || typeof node !== "object" || depth > 20) return null;
  const t =
    node.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
  if (t) return t;
  for (const k in node) {
    const hit = findToken(node[k], depth + 1);
    if (hit) return hit;
  }
  return null;
}

export async function readPlaylist(playlistId) {
  let data = await browse({ context: CTX, browseId: "VL" + playlistId });
  const title = data?.metadata?.playlistMetadataRenderer?.title || null;

  const tracks = [];
  const seen = new Set();
  collect(data, tracks, seen);

  let token = findToken(data);
  let guard = 0;
  while (token && guard++ < 25) {
    data = await browse({ context: CTX, continuation: token });
    const before = tracks.length;
    collect(data, tracks, seen);
    token = findToken(data);
    if (tracks.length === before) break;
  }

  if (!tracks.length) throw new Error(`playlist ${playlistId} returned no tracks`);

  return {
    title,
    tracks: tracks.map((t, i) => ({ ...t, trackNo: i + 1 })),
  };
}

/** Never throws — a YouTube outage should fall back, not take the site down. */
export async function readPlaylistSafely(playlistId) {
  try {
    return await readPlaylist(playlistId);
  } catch (err) {
    console.error(`[playlist] ${playlistId} live read failed:`, err.message);
    return null;
  }
}
