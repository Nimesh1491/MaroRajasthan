"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CoverArt from "./CoverArt";
import { fmtClock as fmt, ytMusicLink } from "@/lib/links";

/**
 * The player, as a phone expects it.
 *
 * Two pieces: a mini player docked above the tab bar, and the full-screen
 * now-playing sheet it opens into. Neither is rendered on a desktop, where the
 * docked bar in Station.js does the job.
 *
 * Neither of them owns the YouTube iframe either. Both only mark out a slot and
 * ask the station for the video — see setVideoSlot — because there is one player
 * and it cannot be moved in the DOM without reloading. What plays in the sheet's
 * frame, and in the mini player's thumbnail, is the real video.
 *
 * The station is handed down rather than pulled out of context: this file is
 * rendered by Station.js, and importing back out of it would be a cycle.
 */
export default function MobilePlayer({ s }) {
  return (
    <>
      <MiniPlayer s={s} />
      {s.started && s.expanded && <NowPlayingSheet s={s} />}
    </>
  );
}

function MiniPlayer({ s }) {
  const { current, playing, started, duration, time, expanded, setVideoSlot } = s;
  const pct = duration ? Math.min(100, (time / duration) * 100) : 0;
  const thumbRef = useRef(null);

  // With the sheet down, the mini player's thumbnail is where the video plays —
  // cropped square, because that is the shape there is room for. The sheet takes
  // it back the moment it is opened.
  useEffect(() => {
    const wanted = started && !expanded ? thumbRef.current : null;
    setVideoSlot("mini", wanted, { fit: "cover" });
    return () => setVideoSlot("mini", null);
  }, [setVideoSlot, started, expanded]);

  return (
    <div
      aria-hidden={!started || s.expanded}
      className={`app-mini fixed inset-x-0 z-40 px-2 pb-2 transition-all duration-300 desk:hidden ${
        started && !s.expanded
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-cream/12 bg-ink2/95 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.95)] backdrop-blur">
        {/* How far through the track we are — the mini player's one readout. */}
        <div className="h-[2px] bg-cream/10">
          <div
            className="h-full bg-marigold transition-[width] duration-500 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center gap-2 p-2">
          <button
            onClick={() => s.setExpanded(true)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-label="Open the player"
          >
            <span
              ref={thumbRef}
              className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ink"
            >
              <CoverArt youtubeId={current?.youtubeId} alt="" eager className="h-full w-full" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-devanagari text-base leading-tight text-cream">
                {current?.dev || current?.latin || "—"}
              </span>
              <span className="block truncate text-[11px] text-cream/55">
                {current ? current.latin : "Nothing playing"}
              </span>
            </span>
          </button>

          <button
            onClick={s.toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-ink"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={s.next}
            aria-label="Next"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-cream/70"
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function NowPlayingSheet({ s }) {
  const { current, playing, queue, index, collection, duration, time, shuffle } = s;
  const { setVideoSlot } = s;
  const [showList, setShowList] = useState(false);
  const frameRef = useRef(null);
  // Swipe down to put the sheet away — from the handle, and from the artwork.
  const [drag, setDrag] = useState(0);
  const startY = useRef(null);

  const close = () => s.setExpanded(false);

  // The sheet's frame is where the video plays. It gives the claim up while the
  // running order is open, because the video is drawn over the sheet and would
  // otherwise sit on top of the list.
  useEffect(() => {
    setVideoSlot("sheet", showList ? null : frameRef.current);
    return () => setVideoSlot("sheet", null);
  }, [setVideoSlot, showList]);

  // The page behind must not scroll while the sheet is up.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const grab = {
    onTouchStart: (e) => {
      startY.current = e.touches[0].clientY;
    },
    onTouchMove: (e) => {
      if (startY.current === null) return;
      setDrag(Math.max(0, e.touches[0].clientY - startY.current));
    },
    onTouchEnd: () => {
      startY.current = null;
      if (drag > 110) close();
      else setDrag(0);
    },
  };

  return (
    <div
      role="dialog"
      aria-label="Now playing"
      className="app-sheet fixed inset-0 z-[70] desk:hidden"
      style={drag ? { transform: `translateY(${drag}px)` } : undefined}
    >
      {/* The sleeve, blown up and blurred, is the backdrop — so the sheet takes
          its colour from whatever is playing. */}
      <div className="absolute inset-0 overflow-hidden bg-ink">
        {current?.youtubeId && (
          <CoverArt
            youtubeId={current.youtubeId}
            className="absolute inset-0 h-full w-full scale-150 opacity-60 blur-3xl saturate-150"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/70 to-ink/95" />
      </div>

      {/* One column, centred: on a tablet the sheet should stay a player and
          not spread itself across the whole screen. */}
      <div className="app-safe-top relative mx-auto flex h-full w-full max-w-md flex-col px-5 pb-5 sm:max-w-lg">
        <div {...grab} className="shrink-0 pt-2">
          <div className="mx-auto h-1 w-10 rounded-full bg-cream/25" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              onClick={close}
              aria-label="Close the player"
              className="-ml-2 grid h-9 w-9 place-items-center rounded-full text-cream/75"
            >
              <ChevronDown />
            </button>
            <div className="min-w-0 text-center">
              <p className="font-mono text-[9px] tracking-[0.24em] text-cream/45">
                PLAYING FROM
              </p>
              <p className="truncate text-[12px] text-cream/85">
                {collection?.latin || "the station"}
              </p>
            </div>
            <button
              onClick={() => setShowList((v) => !v)}
              aria-label="Running order"
              aria-pressed={showList}
              className={`-mr-2 grid h-9 w-9 place-items-center rounded-full ${
                showList ? "text-marigold" : "text-cream/75"
              }`}
            >
              <ListIcon />
            </button>
          </div>
        </div>

        {/* Frame, title and transport travel together as one block, centred in
            whatever room is left. Pinning the controls to the bottom instead
            leaves a tablet with a hole through the middle of the sheet. */}
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain">

        {/* The frame. The station walks the live player over this, so what plays
            here is the video itself; the sleeve underneath is what shows until it
            arrives, and again while the running order covers it. 16:9, because
            that is the shape every one of these uploads is. */}
        <div {...grab} className="flex shrink-0 items-center justify-center py-4">
          <div
            ref={frameRef}
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-cream/12 bg-black shadow-[0_28px_70px_-20px_rgba(0,0,0,0.95)]"
          >
            <CoverArt
              youtubeId={current?.youtubeId}
              alt={current?.latin || ""}
              eager
              className="h-full w-full"
            />
          </div>
        </div>

        {/* what it is */}
        <div className="shrink-0">
          <h2 className="line-clamp-2 font-devanagari text-2xl leading-tight text-cream">
            {current?.dev || current?.latin || "—"}
          </h2>
          <p className="mt-1 truncate text-sm text-cream/75">
            {current?.dev ? current.latin : current?.singers || ""}
          </p>
          <p className="truncate text-xs text-cream/45">
            {[current?.dev ? current?.singers : null, current?.source]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        {/* seek */}
        <div className="mt-4 shrink-0">
          <input
            type="range"
            className="seek seek-fat h-5 w-full cursor-pointer"
            min={0}
            max={duration || 1}
            step={1}
            value={Math.min(time, duration || 1)}
            onChange={(e) => s.seek(Number(e.target.value))}
            aria-label="Seek"
          />
          <div className="mt-0.5 flex justify-between font-mono text-[11px] text-cream/50">
            <span>{fmt(time)}</span>
            <span>{current?.length || fmt(duration)}</span>
          </div>
        </div>

        {/* transport */}
        <div className="mt-3 flex shrink-0 items-center justify-between">
          <button
            onClick={s.toggleShuffle}
            aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
            aria-pressed={shuffle}
            className={`grid h-11 w-11 place-items-center rounded-full ${
              shuffle ? "text-marigold" : "text-cream/55"
            }`}
          >
            <ShuffleIcon />
          </button>
          <button
            onClick={s.prev}
            aria-label="Previous"
            className="grid h-12 w-12 place-items-center rounded-full text-cream"
          >
            <PrevIcon />
          </button>
          <button
            onClick={s.toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-16 w-16 place-items-center rounded-full bg-cream text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9)]"
          >
            {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
          </button>
          <button
            onClick={s.next}
            aria-label="Next"
            className="grid h-12 w-12 place-items-center rounded-full text-cream"
          >
            <NextIcon size={26} />
          </button>
          <div className="grid h-11 w-11 place-items-center font-mono text-[11px] text-cream/45">
            {index + 1}/{queue.length}
          </div>
        </div>

        {/* the two things a track links out to */}
        <div className="mt-3 flex shrink-0 items-center justify-center gap-2 text-[12px]">
          {current && (
            <>
              <Link
                href={`/songs/${current.slug}`}
                onClick={close}
                className="rounded-full border border-cream/18 px-4 py-1.5 text-cream/80"
              >
                Credits
              </Link>
              <a
                href={ytMusicLink(current)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/18 px-4 py-1.5 text-cream/80"
              >
                YT Music ↗
              </a>
            </>
          )}
        </div>

        </div>
      </div>

      {/* the running order, over the sheet */}
      {showList && (
        <div className="app-subsheet absolute inset-x-0 bottom-0 z-20 max-h-[72%] overflow-hidden rounded-t-3xl border-t border-cream/12 bg-ink/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 border-b border-cream/10 px-5 py-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-marigold">
              UP NEXT{shuffle ? " · SHUFFLED" : ""}
            </p>
            <button
              onClick={() => setShowList(false)}
              aria-label="Hide the running order"
              className="text-xs text-cream/55"
            >
              Close
            </button>
          </div>
          <ol className="mx-auto max-h-[calc(72vh-3rem)] max-w-2xl overflow-y-auto overscroll-contain pb-6">
            {queue.map((t, i) => {
              const isCurrent = i === index;
              return (
                <li key={t.slug}>
                  <button
                    onClick={() => s.goTo(i)}
                    className={`flex w-full items-center gap-3 px-5 py-2.5 text-left ${
                      isCurrent ? "bg-cream/10" : ""
                    }`}
                  >
                    <CoverArt
                      youtubeId={t.youtubeId}
                      className="h-10 w-10 shrink-0 rounded-md"
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate font-devanagari text-[15px] leading-tight ${
                          isCurrent ? "text-marigold" : "text-cream"
                        }`}
                      >
                        {t.dev || t.latin}
                      </span>
                      <span className="block truncate text-[11px] text-cream/50">
                        {t.dev ? t.latin : t.singers}
                      </span>
                    </span>
                    {isCurrent && playing ? (
                      <Equalizer />
                    ) : (
                      <span className="shrink-0 font-mono text-[11px] text-cream/40">
                        {t.length}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

/** Three bars, to mark the row that is playing. */
export function Equalizer({ className = "" }) {
  return (
    <span
      className={`eq flex h-3.5 shrink-0 items-end gap-[2px] ${className}`}
      aria-hidden="true"
    >
      <span className="h-full w-[3px] rounded-sm bg-marigold" />
      <span className="h-full w-[3px] rounded-sm bg-marigold" />
      <span className="h-full w-[3px] rounded-sm bg-marigold" />
    </span>
  );
}

const PlayIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5l12 7-12 7z" />
  </svg>
);

const PauseIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
  </svg>
);

const NextIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 6h2v12h-2zM4 6l9 6-9 6z" />
  </svg>
);

const PrevIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 6h2v12H7zM20 6v12l-9-6z" />
  </svg>
);

const ShuffleIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v5" />
    <path d="M4 20 21 3" />
    <path d="M21 16v5h-5" />
    <path d="M15 15l6 6" />
    <path d="M4 4l5 5" />
  </svg>
);

const ListIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 6h11M4 12h11M4 18h7" />
    <path d="M17 14l4 3-4 3z" fill="currentColor" stroke="none" />
  </svg>
);

const ChevronDown = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
