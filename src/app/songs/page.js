import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CoverArt from "@/components/CoverArt";
import { getCatalogue } from "@/data/catalogue";

// Next requires this to be a literal, so it cannot import the shared
// constant. Keep it in step with REVALIDATE_SECONDS in lib/playlist.js.
export const revalidate = 600;

export const metadata = {
  title: "All songs — the Rajasthani folk canon · Maro Rajasthan",
  description:
    "Every record in the station: the traditional Manganiyar, Langa, ghoomar and bhajan repertoire, the film recordings, and the two YouTube playlists read live.",
};

export default async function SongsPage() {
  const cat = await getCatalogue();

  // Undated material first — the traditional repertoire and the playlist
  // tracks, whose uploads give no release date — then the dated recordings in
  // the order they came out.
  const ordered = [...cat.songs].sort((a, b) => {
    if (!a.year && !b.year) return a.latin.localeCompare(b.latin);
    if (!a.year) return -1;
    if (!b.year) return 1;
    return a.year - b.year;
  });
  const dated = ordered.filter((s) => s.year).length;
  const trad = ordered.length - dated;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <nav className="text-sm text-cream/45">
          <Link href="/" className="transition hover:text-cream">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-cream/70">All songs</span>
        </nav>

        <h1 className="mt-6 font-devanagari text-4xl text-cream sm:text-5xl">
          सारा संगीत
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
          {ordered.length} records. {trad} of them carry no release year — the
          traditional repertoire, and the playlist tracks whose uploads give no
          release date — and those come first; the {dated} film and studio
          recordings follow in the order they came out. Every one of them is in
          at least one collection. Tap any title for the credits and the story,
          or press play to drop it into the station.
        </p>

        <ul className="mt-12 border-t border-cream/8">
          {ordered.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/songs/${s.slug}`}
                className="flex items-center gap-3 border-b border-cream/8 py-3 transition hover:bg-cream/[0.03] desk:items-baseline desk:gap-5 desk:py-4"
              >
                {/* The sleeve stands in for the year column on a phone, where a
                    list of records should look like one. */}
                <CoverArt
                  youtubeId={s.youtubeId}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg border border-cream/10 desk:hidden"
                />
                <span className="hidden w-12 shrink-0 font-mono text-xs text-cream/35 sm:block">
                  {s.year || "trad."}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block leading-tight text-cream ${
                      s.dev ? "font-devanagari text-xl" : "text-base font-medium"
                    }`}
                  >
                    {s.dev || s.latin}
                  </span>
                  <span className="block truncate text-sm text-cream/60">
                    {s.dev ? s.latin : s.singers || "—"}
                    {s.source ? ` · ${s.source}` : ""}
                    {s.unenriched && (
                      <span className="ml-2 text-marigold/70">· newly added</span>
                    )}
                  </span>
                </span>
                <span className="hidden max-w-[13rem] shrink-0 truncate text-right text-xs text-cream/40 sm:block">
                  {s.singers}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-cream/30 desk:hidden">
                  {s.year || "trad."}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
