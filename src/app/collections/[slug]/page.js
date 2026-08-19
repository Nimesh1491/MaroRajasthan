import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CoverArt from "@/components/CoverArt";
import { PlayCollectionButton, TrackRow } from "@/components/PlayButtons";
import { COLLECTIONS, collectionBySlug, getCatalogue } from "@/data/catalogue";

// Next requires this to be a literal, so it cannot import the shared
// constant. Keep it in step with REVALIDATE_SECONDS in lib/playlist.js.
export const revalidate = 600;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.latin} (${c.dev}) — Rajasthani folk · Maro Rajasthan`,
    description: c.blurb,
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const cat = await getCatalogue();
  const collection = cat.collection(slug);
  if (!collection) notFound();

  const songs = collection.songs;
  // Only the fields the client actually needs to play and label the queue.
  const queue = songs.map((s) => ({
    slug: s.slug,
    dev: s.dev,
    latin: s.latin,
    source: s.source,
    singers: s.singers,
    length: s.length,
    youtubeId: s.youtubeId,
  }));
  const meta = { slug: collection.slug, latin: collection.latin, dev: collection.dev };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <nav className="text-sm text-cream/45">
          <Link href="/" className="transition hover:text-cream">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/collections" className="transition hover:text-cream">
            Collections
          </Link>
          <span className="px-2">/</span>
          <span className="text-cream/70">{collection.latin}</span>
        </nav>

        {/* A phone reads this the way it reads an album: sleeve, title, and one
            button the width of the screen. */}
        <div className="mx-auto mt-6 flex max-w-md flex-col items-center text-center desk:hidden">
          <CoverArt
            youtubeId={songs[0]?.youtubeId}
            alt=""
            eager
            className="aspect-square w-[62vw] max-w-[16rem] rounded-2xl border border-cream/12 shadow-[0_26px_60px_-24px_rgba(0,0,0,0.95)]"
          />
          <h1 className="mt-5 font-devanagari text-3xl leading-tight text-cream">
            {collection.dev}
          </h1>
          <p className="mt-2 text-base text-cream/85">{collection.latin}</p>
          <p className="mt-1 font-mono text-[11px] text-cream/45">
            {collection.count} songs · {collection.minutes} min
          </p>
          <div className="mt-5 w-full">
            <PlayCollectionButton
              songs={queue}
              collection={meta}
              label="Play the collection"
              className="w-full justify-center py-3 sm:w-auto sm:px-8"
            />
          </div>
        </div>

        <div className="hidden desk:block">
          <h1 className="mt-7 font-devanagari text-4xl leading-tight text-cream sm:text-6xl sm:leading-none">
            {collection.dev}
          </h1>
          <p className="mt-4 text-xl text-cream/85">{collection.latin}</p>
          <p className="mt-1.5 text-sm text-cream/50">
            {collection.count} songs · {collection.minutes} min
          </p>

          <div className="mt-8">
            <PlayCollectionButton songs={queue} collection={meta} />
          </div>
        </div>

        <p className="mt-10 text-lg leading-relaxed text-cream/85">
          {collection.blurb}
        </p>
        <blockquote className="mt-7 border-l-2 border-marigold/60 pl-5 font-devanagari text-lg leading-relaxed text-cream/70">
          {collection.blurbHi}
        </blockquote>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-mono text-xs tracking-[0.26em] text-marigold">
            RUNNING ORDER
          </h2>
          {collection.playlistId && (
            <p className="text-[11px] text-cream/35">
              {collection.live
                ? "live from the YouTube playlist · refreshes every 10 minutes"
                : "YouTube unreachable — showing the checked-in copy"}
            </p>
          )}
        </div>
        <ol className="mt-4 border-t border-cream/8">
          {songs.map((song, i) => (
            <TrackRow
              key={song.slug}
              song={song}
              n={i + 1}
              songs={queue}
              collection={meta}
            />
          ))}
        </ol>

        <h2 className="mt-14 font-mono text-xs tracking-[0.26em] text-cream/40">
          OTHER COLLECTIONS
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {cat.collections
            .filter((c) => c.slug !== collection.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="rounded-full border border-cream/18 px-4 py-2 text-cream/75 transition hover:border-marigold/50 hover:text-cream"
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
