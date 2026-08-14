import Link from "next/link";
import StationMark from "./StationMark";
import { COLLECTIONS } from "@/data/catalogue";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-cream/10 bg-ink2/40">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <StationMark size={34} />
            <span className="leading-tight">
              <span className="block font-devanagari text-lg text-cream">
                मारो राजस्थान
              </span>
              <span className="block text-[10px] tracking-[0.22em] text-marigold">
                MARO RAJASTHAN
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
            Rajasthani folk, playing live. Also spelled Mharo Rajasthan — in
            Marwari the shop ledger almost always says maro.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] tracking-[0.24em] text-cream/40">COLLECTIONS</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="text-cream/80 transition hover:text-marigold"
                >
                  {c.latin}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link
                href="/songs"
                className="text-cream/80 transition hover:text-marigold"
              >
                All songs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-3 px-6 pb-16 text-xs leading-relaxed text-cream/35">
        <p>
          Audio is streamed through YouTube&rsquo;s embedded player; all rights
          remain with the respective labels, composers and performers. Nothing is
          hosted here. Credits are compiled from film soundtrack listings and the
          uploads themselves.
        </p>
        <p>
          The station is free and stays free. Where a song exists in several
          readings, the entry is named after the recording that actually plays.
        </p>
      </div>
    </footer>
  );
}
