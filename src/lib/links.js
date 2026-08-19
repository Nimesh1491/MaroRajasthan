export function ytMusicLink(song) {
  return `https://music.youtube.com/watch?v=${song.youtubeId}`;
}

export function youtubeWatch(song) {
  return `https://www.youtube.com/watch?v=${song.youtubeId}`;
}

export function fmtClock(secs) {
  if (!Number.isFinite(secs)) return "--:--";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Cover art for a track, in the order to try it.
 *
 * Nothing is hosted here, so the sleeve is the upload's own thumbnail,
 * hotlinked the same way the audio is streamed. maxres is missing on plenty of
 * older uploads and hq is letterboxed 4:3, so the list runs from best to
 * safest and the sleeve falls down it on error. mq is 16:9 with no bars, which
 * is what a square crop wants.
 */
export function coverCandidates(youtubeId) {
  if (!youtubeId) return [];
  return [
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
  ];
}
