import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PlaySongButton } from "@/components/PlayButtons";
import { getCatalogue } from "@/data/catalogue";
import { ytMusicLink } from "@/lib/links";

// Next requires this to be a literal, so it cannot import the shared
// constant. Keep it in step with REVALIDATE_SECONDS in lib/playlist.js.
export const revalidate = 600;

// Songs that arrive from a playlist later are not known at build time, so pages
// for them are rendered on first request rather than 404'd.
export const dynamicParams = true;

// Built from the live catalogue rather than the whole file: the reserve entries
// in catalogue.js are enrichment only and have no page of their own.
export async function generateStaticParams() {
  const cat = await getCatalogue();
  return cat.songs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = await getCatalogue();
  const s = cat.song(slug);
  if (!s) return {};
  return {
    title: `${s.latin}${s.dev ? ` (${s.dev})` : ""} — ${s.source || "Rajasthani folk"} · Maro Rajasthan`,
    description: s.note || `${s.latin}, credited to ${s.singers || "an uncredited artist"}.`,
  };
}

function Credit({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-6 border-b border-cream/8 py-3">
      <dt className="w-28 shrink-0 text-sm text-cream/45">{label}</dt>
      <dd className="text-sm text-cream/90">{value}</dd>
    </div>
  );
}

export default async function SongPage({ params }) {
  const { slug } = await params;
  const cat = await getCatalogue();
  const song = cat.song(slug);
  if (!song) notFound();

  const collections = song.collections
    .map((c) => cat.collection(c))
    .filter(Boolean);
  const home = collections[0] || null;
  const queue = (home?.songs || [song]).map((s) => ({
    slug: s.slug,
    dev: s.dev,
    latin: s.latin,
    source: s.source,
    singers: s.singers,
    length: s.length,
    youtubeId: s.youtubeId,
  }));
  const meta = home ? { slug: home.slug, latin: home.latin, dev: home.dev } : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 sm:pt-14">
        <nav className="text-sm text-cream/45">
          <Link href="/" className="transition hover:text-cream">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/songs" className="transition hover:text-cream">
            All songs
          </Link>
          <span className="px-2">/</span>
          <span className="text-cream/70">{song.latin}</span>
        </nav>

        {(song.source || song.year) && (
          <p className="mt-7 font-mono text-xs tracking-[0.22em] text-lac">
            {(song.source || "").toUpperCase()}
            {song.year ? `${song.source ? " · " : ""}${song.year}` : ""}
          </p>
        )}
        <h1
          className={`mt-3 leading-tight text-cream ${
            song.dev
              ? "font-devanagari text-4xl sm:text-5xl"
              : "text-3xl font-semibold sm:text-4xl"
          }`}
        >
          {song.dev || song.latin}
        </h1>
        {song.dev && <p className="mt-3 text-lg text-cream/80">{song.latin}</p>}

        {/* Full-width buttons on a phone, as an app would give them. */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <PlaySongButton
            song={song}
            songs={queue}
            collection={meta}
            className="w-full justify-center py-3 sm:w-auto sm:py-2.5"
          />
          <a
            href={ytMusicLink(song)}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border border-cream/22 px-4 py-3 text-center text-sm text-cream/85 transition hover:border-cream/55 hover:text-cream sm:w-auto sm:py-2.5"
          >
            YouTube Music ↗
          </a>
        </div>

        {song.note ? (
          <>
            <p className="mt-10 text-lg leading-relaxed text-cream/85">
              {song.note}
            </p>
            <blockquote className="mt-6 border-l-2 border-marigold/60 pl-5 font-devanagari text-lg leading-relaxed text-cream/70">
              {song.noteHi}
            </blockquote>
          </>
        ) : (
          <p className="mt-10 rounded-xl border border-marigold/25 bg-ink2/50 p-5 text-sm leading-relaxed text-cream/60">
            This track came in from the playlist and has not been written up
            yet. What is shown below is what the upload itself carries — no
            credits or history have been guessed at.
          </p>
        )}

        <div className="mt-10 overflow-hidden rounded-xl border border-cream/12 bg-black">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0&modestbranding=1`}
            title={`${song.latin}${song.source ? ` — ${song.source}` : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <h2 className="mt-12 font-mono text-xs tracking-[0.26em] text-marigold">
          CREDITS
        </h2>
        <dl className="mt-4 border-t border-cream/8">
          <Credit label="Source" value={song.source} />
          <Credit label="Singers" value={song.singers} />
          <Credit label="Music" value={song.music} />
          <Credit label="Lyrics" value={song.lyrics} />
          <Credit label="Region" value={song.region} />
          <Credit label="Length" value={song.length} />
          {/* Whichever the recording actually came from — an album or a
              playlist. Never both, and never guessed. */}
          <Credit
            label="Album"
            value={
              song.album
                ? `${song.album}${song.trackNo ? ` · track ${song.trackNo}` : ""}`
                : null
            }
          />
          <Credit
            label="Playlist"
            value={
              song.playlist
                ? `${song.playlist}${song.trackNo ? ` · track ${song.trackNo}` : ""}`
                : null
            }
          />
        </dl>

        <h2 className="mt-12 font-mono text-xs tracking-[0.26em] text-marigold">
          APPEARS IN
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="rounded-full border border-cream/18 px-4 py-2 text-cream/80 transition hover:border-marigold/50 hover:text-cream"
            >
              {c.latin}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
