import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getCatalogue } from "@/data/catalogue";

// Next requires this to be a literal, so it cannot import the shared
// constant. Keep it in step with REVALIDATE_SECONDS in lib/playlist.js.
export const revalidate = 600;

export const metadata = {
  title: "Collections — five ways to hear Rajasthan · Maro Rajasthan",
  description:
    "Four collections to choose from: Rajasthani Bhajans, the Rajasthani Popular Song Collection, the Rajasthani New Hit Song Collection and Ghoomar Songs. Each is read live from its YouTube playlist. Pick one and it plays straight through.",
};

export default async function CollectionsPage() {
  const cat = await getCatalogue();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
        <nav className="text-sm text-cream/45">
          <Link href="/" className="transition hover:text-cream">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-cream/70">Collections</span>
        </nav>

        <h1 className="mt-6 font-devanagari text-4xl text-cream sm:text-5xl">
          संग्रह
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
          {cat.collections.length} collections. Open any of them to see the
          running order, or press play to hear it straight through — nothing is
          scheduled, the choice is yours. Three of them are read straight from
          their YouTube playlist, so they change when the playlist does.
        </p>

        <div className="mt-12 space-y-4">
          {cat.collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="block rounded-2xl border border-cream/12 bg-ink2/50 p-5 transition hover:border-marigold/40 hover:bg-ink2/80 sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-3">
                <div>
                  <h2 className="font-devanagari text-2xl text-cream sm:text-3xl">
                    {c.dev}
                  </h2>
                  <p className="mt-1 text-cream/70">{c.latin}</p>
                </div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-cream/40">
                  {c.count} SONGS · {c.minutes} MIN
                </p>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-cream/60">
                {c.blurb}
              </p>
              {c.playlistId && (
                <p className="mt-4 text-[11px] text-cream/35">
                  {c.live
                    ? "Read live from the YouTube playlist."
                    : "YouTube could not be reached — showing the last checked-in copy."}
                </p>
              )}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
