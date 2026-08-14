import Hero from "@/components/Hero";
import { getCatalogue } from "@/data/catalogue";
import { istParts } from "@/lib/ist";

// The clock is rendered on the server first so the page is not blank, then
// taken over on mount. The page is revalidated on the same cadence as the
// playlists so a track added on YouTube turns up here too.
// Next requires this to be a literal, so it cannot import the shared
// constant. Keep it in step with REVALIDATE_SECONDS in lib/playlist.js.
export const revalidate = 600;

export default async function Home() {
  const p = istParts();
  const cat = await getCatalogue();

  // Only what the client needs to render a card and play its queue.
  const collections = cat.collections.map((c) => ({
    slug: c.slug,
    dev: c.dev,
    latin: c.latin,
    count: c.count,
    minutes: c.minutes,
    songs: c.songs.map((s) => ({
      slug: s.slug,
      dev: s.dev,
      latin: s.latin,
      source: s.source,
      singers: s.singers,
      length: s.length,
      youtubeId: s.youtubeId,
    })),
  }));

  return (
    <Hero
      // `at` is the server's clock, so the browser's first render picks the
      // same backdrop the HTML was built with and hydration stays quiet. The
      // client corrects to the real current slide the moment it mounts.
      initial={{ clock: p.clock, date: p.date, hour: p.hour24, at: Date.now() }}
      collections={collections}
    />
  );
}
