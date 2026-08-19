import Link from "next/link";
import StationMark from "./StationMark";

export default function SiteHeader() {
  return (
    <header className="app-safe-top sticky top-0 z-40 border-b border-cream/10 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition hover:opacity-85 sm:gap-3"
        >
          <StationMark size={34} />
          {/* Never allowed to wrap: on a narrow screen the two-line wordmark
              doubled the header height. */}
          <span className="leading-tight whitespace-nowrap">
            <span className="block font-devanagari text-base text-cream sm:text-lg">
              मारो राजस्थान
            </span>
            <span className="block text-[9px] tracking-[0.16em] text-marigold sm:text-[10px] sm:tracking-[0.22em]">
              MARO RAJASTHAN
            </span>
          </span>
        </Link>
        {/* On a phone or tablet these two live in the tab bar at the bottom, where a
            thumb can reach them, so the header keeps only the wordmark. */}
        <nav className="hidden shrink-0 items-center gap-2 text-sm desk:flex">
          <Link
            href="/collections"
            className="rounded-full border border-cream/20 px-3 py-1.5 text-[13px] text-cream/85 transition hover:border-cream/50 hover:text-cream sm:px-4 sm:text-sm"
          >
            Collections
          </Link>
          <Link
            href="/songs"
            className="rounded-full border border-cream/20 px-3 py-1.5 text-[13px] text-cream/85 transition hover:border-cream/50 hover:text-cream sm:px-4 sm:text-sm"
          >
            Songs
          </Link>
        </nav>
      </div>
    </header>
  );
}
