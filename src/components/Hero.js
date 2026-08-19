"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SceneBackdrop from "./SceneBackdrop";
import StationMark from "./StationMark";
import MobileHome from "./MobileHome";
import { useStation } from "./Station";
import { THEMES, themeForTime } from "@/data/themes";
import { greetingForHour, indianNumber, istParts, sceneForHour } from "@/lib/ist";

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
  // The backdrop is a slideshow on a ten-minute turn, starting from a place
  // picked fresh on each load. `theme` is what is showing; `outgoing` is the
  // one it is fading over, cleared once the crossfade has finished.
  const [offset, setOffset] = useState(0);
  const [theme, setTheme] = useState(() => themeForTime(initial.at, 0).slug);
  const [outgoing, setOutgoing] = useState(null);

  useEffect(() => {
    // Drawn here rather than during render: the server has no way to agree with
    // it, and a first client render that disagreed would be a hydration error.
    const pick = Math.floor(Math.random() * THEMES.length);
    setOffset(pick);

    const tick = (off) => {
      const d = new Date();
      const p = istParts(d);
      setNow({ clock: p.clock, date: p.date, hour: p.hour24 });
      setCount(listenerCount(d));


      const next = themeForTime(d.getTime(), off).slug;
      setTheme((cur) => {
        if (cur === next) return cur;
        setOutgoing(cur);
        return next;
      });
    };
    tick(pick);
    const id = setInterval(() => tick(pick), 15000);
    return () => clearInterval(id);
  }, []);

  // Drop the outgoing layer once it has faded out, so only one scene is
  // mounted between transitions.
  useEffect(() => {
    if (!outgoing) return;
    const id = setTimeout(() => setOutgoing(null), 2200);
    return () => clearTimeout(id);
  }, [outgoing]);

  const greeting = greetingForHour(now.hour);
  const scene = sceneForHour(now.hour);
  const playingSlug = station.collection?.slug || null;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* The slideshow: the arriving scene fades in over the one it replaces.
          A desktop only — a phone and a tablet get काका and a plain ink page
          instead. The markup is still in the page there, just not shown:
          deciding by width in JS would mean a hydration mismatch, or a flash of
          the wrong one. */}
      {outgoing && (
        <div className="absolute inset-0 hidden desk:block">
          <SceneBackdrop scene={scene} theme={outgoing} />
        </div>
      )}
      <div key={theme} className="absolute inset-0 hidden scene-fade desk:block">
        <SceneBackdrop scene={scene} theme={theme} />
      </div>

      {/* A phone or a tablet gets a player's home screen, not the poster. */}
      <MobileHome
        now={now}
        count={count}
        greeting={greeting}
        collections={collections}
      />

      {/* The two corners of the poster — a desktop only. */}
      <div className="absolute inset-x-0 top-7 z-20 hidden gap-4 px-8 desk:flex desk:flex-row desk:items-start desk:justify-between">
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
        <div className="rounded-xl border border-marigold/35 bg-ink/70 p-3 text-center backdrop-blur sm:max-w-[16rem]">
          <p className="text-[11px] leading-relaxed text-cream/75">
            Free, and staying free. No ads, no account, nothing hosted here —
            every track streams from its own YouTube upload.
          </p>
        </div>
      </div>
      </div>

      {/* centre — the poster, a desktop only */}
      <div className="relative z-10 hidden min-h-screen flex-col items-center justify-center px-6 py-24 text-center desk:flex">
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
