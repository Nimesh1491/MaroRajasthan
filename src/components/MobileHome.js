"use client";

import Link from "next/link";
import Kaka from "./Kaka";
import StationMark from "./StationMark";
import { useStation } from "./Station";
import { indianNumber } from "@/lib/ist";

/**
 * The station's front screen on a phone or a tablet.
 *
 * The desktop hero is a poster — a wordmark over an illustrated Rajasthan, read
 * from across a room. That does not survive a 390px screen, so a phone and a
 * tablet get the other thing entirely: काका at the top of the screen, the
 * greeting under him, and one button that starts the music.
 *
 * No list of collections here. It is one tap away in the tab bar and on the
 * button below, and a screen that opens with a face and a play button says what
 * the station is faster than four rows of names do.
 */
export default function MobileHome({ now, count, greeting, collections }) {
  const station = useStation();

  /** Every collection at once, in an order nobody chose. */
  const playEverything = () => {
    const seen = new Set();
    const all = [];
    for (const c of collections) {
      for (const s of c.songs) {
        if (seen.has(s.slug)) continue;
        seen.add(s.slug);
        all.push(s);
      }
    }
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    if (all.length) {
      station.play(all, 0, { slug: "everything", latin: "Every collection", dev: "सारा संगीत" });
    }
  };

  return (
    <div className="app-safe-top relative z-10 mx-auto flex w-full max-w-3xl flex-col desk:hidden">
      <header className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <StationMark size={34} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-devanagari text-base text-cream">
              मारो राजस्थान
            </span>
            <span className="block text-[9px] tracking-[0.18em] text-marigold">
              MARO RAJASTHAN
            </span>
          </span>
        </div>

        {/* Invented, and labelled as invented further down the screen. */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-cream/15 bg-ink/55 px-2.5 py-1 backdrop-blur">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] text-cream">
            {count === null ? "—" : indianNumber(count)}
          </span>
        </span>
      </header>

      {/* काका, at the top of the screen and in the middle of it, standing in his
          own light. He is the whole picture here — no banner behind him. */}
      <div className="relative flex flex-col items-center px-4 pt-2 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_50%_38%,rgba(232,171,46,0.18),rgba(195,24,58,0.10)_38%,transparent_68%)]"
        />

        <Kaka className="relative h-64 w-auto sm:h-80" />

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
          {now.clock} · {now.date}
        </p>
        <h1 className="mt-1.5 font-devanagari text-3xl leading-tight text-cream sm:text-4xl">
          {greeting}
        </h1>
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-cream/75">
          Rajasthani folk, playing live. {collections.length} collections, each
          read straight from its YouTube playlist.
        </p>

        <button
          onClick={playEverything}
          className="mt-5 flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-lac py-3.5 text-sm font-medium text-cream shadow-[0_10px_28px_-12px_rgba(195,24,58,0.9)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5" />
            <path d="M4 20 21 3" />
            <path d="M21 16v5h-5" />
            <path d="M15 15l6 6" />
            <path d="M4 4l5 5" />
          </svg>
          Play everything, shuffled
        </button>

        {/* The way to a particular collection, now that the list is not here. */}
        <Link
          href="/collections"
          className="mt-2.5 flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-cream/25 py-3 text-sm text-cream/85"
        >
          Pick a collection
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="space-y-2.5 px-4 pb-8 pt-12 text-[11px] leading-relaxed text-cream/45">
        <p>
          The listener count above is a number this station made up — there is no
          analytics here and nobody is counted.
        </p>
        <p>
          Free, and staying free. No ads, no account, nothing hosted here — every
          track streams from its own YouTube upload.
        </p>
        <p className="pt-1 text-cream/60">Built with ❤️ Nimesh Prajapati</p>
      </div>
    </div>
  );
}
