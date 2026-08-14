"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SceneBackdrop from "./SceneBackdrop";
import StationMark from "./StationMark";
import ThemePicker from "./ThemePicker";
import { useStation } from "./Station";
import { DEFAULT_THEME, THEMES } from "@/data/themes";
import { greetingForHour, indianNumber, istParts, sceneForHour } from "@/lib/ist";

const THEME_KEY = "maro-rajasthan:theme";

/**
 * A made-up listener count. There is no analytics here and nobody is counted:
 * this is a sine wave over the day plus a hash of the clock, so the figure
 * drifts and jitters the way a real one would. It is labelled as invented on
 * the page, because a number presented next to a live-looking pulse would
 * otherwise read as a measurement.
 */
function listenerCount(date) {
  const mins = Math.floor(date.getTime() / 60000);
  const base = 78000;
  const daily = Math.sin((mins % 1440) / 1440 * Math.PI * 2 - 1.6) * 21000;
  const wobble = ((mins * 2654435761) % 1700) - 850;
  return Math.round(base + daily + wobble);
}

export default function Hero({ initial, collections }) {
  const station = useStation();
  const [now, setNow] = useState(initial);
  const [count, setCount] = useState(null);
  // Read after mount, never during render — the server has no localStorage and
  // a first client render that disagreed with it would be a hydration mismatch.
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved && THEMES.some((t) => t.slug === saved)) setTheme(saved);
    } catch {
      // private mode, or storage disabled — the default is fine
    }
  }, []);

  const chooseTheme = (slug) => {
    setTheme(slug);
    try {
      window.localStorage.setItem(THEME_KEY, slug);
    } catch {}
  };

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = istParts(d);
      setNow({ clock: p.clock, date: p.date, hour: p.hour24 });
      setCount(listenerCount(d));
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const greeting = greetingForHour(now.hour);
  const scene = sceneForHour(now.hour);
  const playingSlug = station.collection?.slug || null;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <SceneBackdrop scene={scene} theme={theme} />

      {/* The two corners. On a phone they cannot float over the wordmark, so
          they become an ordinary stacked header and the centre starts below. */}
      <div className="relative z-20 flex flex-col gap-5 px-5 pt-5 sm:absolute sm:inset-x-0 sm:top-7 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-8 sm:pt-0">
      <div>
        <p className="font-mono text-xl leading-none text-cream drop-shadow sm:text-2xl">
          {now.clock}
        </p>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/65">
          {now.date}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-cream/75">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-cream">
            {count === null ? "—" : indianNumber(count)}
          </span>
          <span className="text-cream/60">tuned in</span>
        </p>
        <p className="mt-0.5 text-[10px] italic text-cream/40">
          a number this station made up
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-ink/40 px-3 py-1 text-[11px] text-cream backdrop-blur">
          Built with ❤️ Nimesh Prajapati
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <nav className="flex gap-2 text-sm">
          <Link
            href="/collections"
            className="rounded-full border border-cream/25 bg-ink/35 px-4 py-1.5 text-cream backdrop-blur transition hover:border-cream/60"
          >
            Collections
          </Link>
          <Link
            href="/songs"
            className="rounded-full border border-cream/25 bg-ink/35 px-4 py-1.5 text-cream backdrop-blur transition hover:border-cream/60"
          >
            All songs
          </Link>
        </nav>
        <ThemePicker value={theme} onChange={chooseTheme} />

        <div className="rounded-xl border border-marigold/35 bg-ink/70 p-3 text-center backdrop-blur sm:max-w-[16rem]">
          <p className="text-[11px] leading-relaxed text-cream/75">
            Free, and staying free. No ads, no account, nothing hosted here —
            every track streams from its own YouTube upload.
          </p>
        </div>
      </div>
      </div>

      {/* centre */}
      <div className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center px-4 pb-16 pt-10 text-center sm:min-h-screen sm:px-6 sm:py-24">
        <StationMark size={64} />

        <h1 className="mt-4 font-devanagari text-4xl leading-[0.95] text-cream drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)] sm:text-6xl">
          मारो राजस्थान
        </h1>
        <p className="mt-2.5 text-[10px] tracking-[0.32em] text-cream/70 sm:text-xs sm:tracking-[0.42em]">
          MARO RAJASTHAN
        </p>

        <p className="mt-5 max-w-2xl text-sm text-cream/85 sm:text-base">
          <span className="font-devanagari text-lg text-marigold">
            {greeting}
          </span>{" "}
          — {collections.length} collections. Pick the one you want and it
          plays out loud.
        </p>

        {/* the picker */}
        <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {collections.map((a) => {
            const isPlaying = playingSlug === a.slug;
            const meta = { slug: a.slug, latin: a.latin, dev: a.dev };
            return (
              <div
                key={a.slug}
                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left backdrop-blur transition ${
                  isPlaying
                    ? "border-marigold/70 bg-ink/80"
                    : "border-cream/20 bg-ink/55 hover:border-cream/50 hover:bg-ink/75"
                }`}
              >
                <button
                  onClick={() => station.play(a.songs, 0, meta)}
                  aria-label={`Play ${a.latin}`}
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${
                    isPlaying
                      ? "bg-marigold text-ink"
                      : "bg-lac text-cream group-hover:bg-[#d82049]"
                  }`}
                >
                  {isPlaying && station.playing ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5l12 7-12 7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => station.play(a.songs, 0, meta)}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="block font-devanagari text-2xl leading-tight text-cream">
                    {a.dev}
                  </span>
                  <span className="block text-sm text-cream/75">
                    {a.latin}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-cream/45">
                    {a.count} songs · {a.minutes} min
                  </span>
                </button>

                <Link
                  href={`/collections/${a.slug}`}
                  className="shrink-0 self-end whitespace-nowrap rounded-lg px-2 py-1 text-[11px] text-cream/50 transition hover:text-marigold"
                  aria-label={`Open ${a.latin}`}
                >
                  Tracks →
                </Link>
              </div>
            );
          })}
        </div>

        {!station.started ? (
          <p className="mt-7 text-xs text-cream/45">
            Audio starts when you press play. Space bar toggles it after that.
          </p>
        ) : (
          <>
            <div className="mt-7 rounded-full border border-cream/20 bg-ink/55 px-6 py-2 text-[11px] tracking-[0.22em] text-cream/85 backdrop-blur">
              NOW PLAYING · {(station.collection?.latin || "").toUpperCase()}
            </div>
            {/* keeps the docked player from covering the last line */}
            <div className="h-40" />
          </>
        )}
      </div>
    </section>
  );
}
