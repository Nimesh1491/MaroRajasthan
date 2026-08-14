"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { fmtClock as fmt, ytMusicLink } from "@/lib/links";

const StationContext = createContext(null);

export function useStation() {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error("useStation must be used inside <StationProvider>");
  return ctx;
}

let apiPromise = null;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export function StationProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const [collection, setCollection] = useState(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  // Some uploads refuse to be embedded. The station skips past them rather
  // than sitting on a dead track.
  const [blocked, setBlocked] = useState([]);

  const playerRef = useRef(null);
  const hostRef = useRef(null);
  const pendingRef = useRef(null);
  const queueRef = useRef([]);
  const indexRef = useRef(0);
  // The running order as positions into `queue`. In sequence it is 0,1,2…; with
  // shuffle on it is a permutation, so next/previous follow the shuffled path
  // while the printed running order stays as the collection has it.
  const orderRef = useRef([]);
  const posRef = useRef(0);

  queueRef.current = queue;
  indexRef.current = index;

  const current = queue[index] || null;

  /** Fisher–Yates over every position except the one playing, which stays put
   *  so turning shuffle on never interrupts the current track. */
  function shuffledOrder(length, keepFirst) {
    const rest = [];
    for (let i = 0; i < length; i++) if (i !== keepFirst) rest.push(i);
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    return [keepFirst, ...rest];
  }

  const goTo = useCallback((queueIndex) => {
    const q = queueRef.current;
    if (!q.length) return;
    const at = Math.min(Math.max(queueIndex, 0), q.length - 1);
    setIndex(at);
    setTime(0);
    setDuration(0);
    const p = orderRef.current.indexOf(at);
    posRef.current = p === -1 ? 0 : p;
    const player = playerRef.current;
    if (player?.loadVideoById) player.loadVideoById(q[at].youtubeId);
  }, []);

  const advance = useCallback((delta) => {
    const q = queueRef.current;
    const order = orderRef.current;
    if (!q.length || !order.length) return;
    posRef.current = (posRef.current + delta + order.length) % order.length;
    const nextIndex = order[posRef.current];
    setIndex(nextIndex);
    setTime(0);
    setDuration(0);
    const p = playerRef.current;
    if (p?.loadVideoById) p.loadVideoById(q[nextIndex].youtubeId);
  }, []);

  const skipBlocked = useCallback(
    (song) => {
      setBlocked((b) => (b.includes(song.slug) ? b : [...b, song.slug]));
      advance(1);
    },
    [advance]
  );

  // Create the player once, on the first real user gesture.
  const ensurePlayer = useCallback(
    async (firstSong) => {
      if (playerRef.current) {
        playerRef.current.loadVideoById(firstSong.youtubeId);
        return;
      }
      const YT = await loadYouTubeApi();
      if (playerRef.current) {
        playerRef.current.loadVideoById(firstSong.youtubeId);
        return;
      }
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: firstSong.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(volume);
            e.target.playVideo();
          },
          onStateChange: (e) => {
            const S = window.YT.PlayerState;
            if (e.data === S.PLAYING) setPlaying(true);
            if (e.data === S.PAUSED) setPlaying(false);
            if (e.data === S.ENDED) advance(1);
          },
          onError: () => {
            const song = queueRef.current[indexRef.current];
            if (song) skipBlocked(song);
          },
        },
      });
    },
    [advance, skipBlocked, volume]
  );

  // Poll position while playing.
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      const p = playerRef.current;
      if (!p?.getCurrentTime) return;
      const t = p.getCurrentTime();
      const d = p.getDuration();
      if (Number.isFinite(t)) setTime(t);
      if (Number.isFinite(d) && d > 0) setDuration(d);
    }, 500);
    return () => clearInterval(id);
  }, [started]);

  /**
   * The only way in. Callers hand over the queue they want played, because the
   * playlist-backed collections are read on the server and the client has no
   * copy of the catalogue to look them up in.
   *
   * @param songs      ordered queue
   * @param startAt    index to begin on
   * @param collection the collection object, used for the label and links
   */
  const play = useCallback(
    (songs, startAt = 0, collection = null) => {
      if (!songs?.length) return;
      const at = Math.min(Math.max(startAt, 0), songs.length - 1);
      setQueue(songs);
      setIndex(at);
      setCollection(collection);
      setStarted(true);
      setCollapsed(false);
      setShowQueue(false);
      setTime(0);
      setDuration(0);
      queueRef.current = songs;
      indexRef.current = at;
      orderRef.current = shuffle
        ? shuffledOrder(songs.length, at)
        : songs.map((_, i) => i);
      posRef.current = shuffle ? 0 : at;
      ensurePlayer(songs[at]);
    },
    [ensurePlayer, shuffle]
  );

  const toggleShuffle = useCallback(() => {
    setShuffle((on) => {
      const next = !on;
      const q = queueRef.current;
      if (q.length) {
        if (next) {
          orderRef.current = shuffledOrder(q.length, indexRef.current);
          posRef.current = 0;
        } else {
          orderRef.current = q.map((_, i) => i);
          posRef.current = indexRef.current;
        }
      }
      return next;
    });
  }, []);

  /** Start a queue on a particular track. */
  const playAt = useCallback(
    (songs, songSlug, collection = null) => {
      const at = Math.max(
        0,
        (songs || []).findIndex((s) => s.slug === songSlug)
      );
      play(songs, at, collection);
    },
    [play]
  );

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  }, [playing]);

  const seek = useCallback((secs) => {
    const p = playerRef.current;
    if (p?.seekTo) {
      p.seekTo(secs, true);
      setTime(secs);
    }
  }, []);

  const changeVolume = useCallback((v) => {
    setVolume(v);
    setMuted(v === 0);
    const p = playerRef.current;
    if (p?.setVolume) p.setVolume(v);
    if (p?.unMute && v > 0) p.unMute();
  }, []);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.setVolume(volume || 60);
      setMuted(false);
      if (!volume) setVolume(60);
    } else {
      p.mute();
      setMuted(true);
    }
  }, [muted, volume]);

  // Space bar toggles once the station is running, as the original does.
  useEffect(() => {
    if (!started) return;
    const onKey = (e) => {
      if (e.code !== "Space") return;
      const el = e.target;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, toggle]);

  // Pending intent, if a page asked to play before the API finished loading.
  useEffect(() => {
    if (pendingRef.current) {
      const fn = pendingRef.current;
      pendingRef.current = null;
      fn();
    }
  }, []);

  const value = useMemo(
    () => ({
      started,
      playing,
      current,
      queue,
      index,
      collection,
      blocked,
      shuffle,
      play,
      playAt,
      goTo,
      toggle,
      toggleShuffle,
      next: () => advance(1),
      prev: () => advance(-1),
    }),
    [
      started,
      playing,
      current,
      queue,
      index,
      collection,
      blocked,
      shuffle,
      play,
      playAt,
      goTo,
      toggle,
      toggleShuffle,
      advance,
    ]
  );

  return (
    <StationContext.Provider value={value}>
      {children}

      {/* The docked bar. Mounted only once the station starts, and kept
          mounted across route changes so playback survives navigation. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 transition-all duration-300 ${
          started ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-cream/15 bg-ink2/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
          {/* The running order of whatever is playing. */}
          {showQueue && queue.length > 0 && (
            <div className="max-h-64 overflow-y-auto border-b border-cream/12 bg-ink/70">
              <div className="sticky top-0 flex items-baseline justify-between gap-3 border-b border-cream/10 bg-ink/90 px-4 py-2 backdrop-blur">
                <p className="font-mono text-[10px] tracking-[0.22em] text-marigold">
                  UP NEXT · {(collection?.latin || "QUEUE").toUpperCase()}
                </p>
                <p className="font-mono text-[10px] text-cream/40">
                  {index + 1} / {queue.length}
                  {shuffle ? " · shuffled" : ""}
                </p>
              </div>
              <ol>
                {queue.map((s, i) => {
                  const isCurrent = i === index;
                  return (
                    <li key={s.slug}>
                      <button
                        onClick={() => goTo(i)}
                        className={`flex w-full items-center gap-3 px-4 py-2 text-left transition ${
                          isCurrent
                            ? "bg-cream/10 text-cream"
                            : "text-cream/70 hover:bg-cream/[0.06] hover:text-cream"
                        }`}
                      >
                        <span className="w-6 shrink-0 text-right font-mono text-[11px] text-cream/40">
                          {isCurrent && playing ? "▮▮" : i + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {s.dev ? (
                            <span className="font-devanagari text-base">
                              {s.dev}
                            </span>
                          ) : (
                            s.latin
                          )}
                          <span className="ml-2 text-xs text-cream/45">
                            {s.dev ? s.latin : s.singers}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-cream/40">
                          {s.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          <div className="relative flex">
            {/* The video. Pointer events are blocked over it so YouTube's own
                share button and "more videos" overlay never come up.
                On a phone, and when collapsed, it is moved out of view rather
                than hidden or shrunk to nothing — a display:none or zero-size
                iframe can suspend playback, whereas a clipped one keeps going. */}
            <div
              className={`aspect-video w-[210px] shrink-0 bg-black ${
                collapsed
                  ? "absolute -left-[9999px] top-0"
                  : "absolute -left-[9999px] top-0 sm:relative sm:left-auto sm:top-auto"
              }`}
            >
              <div ref={hostRef} className="pointer-events-none h-full w-full" />
              <div className="absolute inset-0 z-10" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1 px-3 py-3 sm:px-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-devanagari text-lg leading-tight text-cream sm:text-xl">
                    {current?.dev || "—"}
                  </p>
                  <p className="truncate text-sm text-cream/80">
                    {current
                      ? `${current.latin} · ${current.source}`
                      : "Pick a collection to start"}
                  </p>
                  <p className="truncate text-xs text-cream/45">
                    {current?.singers}
                  </p>
                </div>
                <button
                  onClick={() => setCollapsed((c) => !c)}
                  aria-label={collapsed ? "Expand player" : "Collapse player"}
                  className="rounded p-1 text-cream/50 transition hover:text-cream"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d={collapsed ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* seek */}
              <div className="mt-3 flex items-center gap-3">
                <span className="w-10 shrink-0 text-right font-mono text-[11px] text-cream/50">
                  {fmt(time)}
                </span>
                <input
                  type="range"
                  className="seek h-3 min-w-0 flex-1 cursor-pointer"
                  min={0}
                  max={duration || 1}
                  step={1}
                  value={Math.min(time, duration || 1)}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Seek"
                />
                <span className="w-10 shrink-0 font-mono text-[11px] text-cream/50">
                  {current?.length || fmt(duration)}
                </span>
              </div>

              {/* controls */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => advance(-1)}
                    aria-label="Previous"
                    className="rounded-full p-2 text-cream/70 transition hover:bg-cream/10 hover:text-cream"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 6h2v12H7zM20 6v12l-9-6z" />
                    </svg>
                  </button>
                  <button
                    onClick={toggle}
                    aria-label={playing ? "Pause" : "Play"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition hover:bg-white"
                  >
                    {playing ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5l12 7-12 7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => advance(1)}
                    aria-label="Next"
                    className="rounded-full p-2 text-cream/70 transition hover:bg-cream/10 hover:text-cream"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15 6h2v12h-2zM4 6l9 6-9 6z" />
                    </svg>
                  </button>

                  <button
                    onClick={toggleShuffle}
                    aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
                    aria-pressed={shuffle}
                    title={shuffle ? "Shuffle on" : "Shuffle off"}
                    className={`rounded-full p-2 transition hover:bg-cream/10 ${
                      shuffle
                        ? "text-marigold hover:text-marigold"
                        : "text-cream/55 hover:text-cream"
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 3h5v5" />
                      <path d="M4 20 21 3" />
                      <path d="M21 16v5h-5" />
                      <path d="M15 15l6 6" />
                      <path d="M4 4l5 5" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowQueue((v) => !v)}
                    aria-label={showQueue ? "Hide the running order" : "Show the running order"}
                    aria-pressed={showQueue}
                    title="Running order"
                    className={`rounded-full p-2 transition hover:bg-cream/10 ${
                      showQueue
                        ? "text-marigold hover:text-marigold"
                        : "text-cream/55 hover:text-cream"
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 6h11M4 12h11M4 18h7" />
                      <path d="M17 14l4 3-4 3z" fill="currentColor" stroke="none" />
                    </svg>
                  </button>

                  {/* Volume is pointless on a touch device — the hardware keys
                      own it there — and it costs width the transport needs. */}
                  <div className="group ml-1 hidden items-center gap-2 sm:flex">
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="rounded-full p-2 text-cream/70 transition hover:bg-cream/10 hover:text-cream"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 9h3l4-4v14l-4-4H4z" />
                        {muted ? (
                          <path
                            d="M15 9l6 6M21 9l-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />
                        ) : (
                          <path
                            d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={muted ? 0 : volume}
                      onChange={(e) => changeVolume(Number(e.target.value))}
                      aria-label="Volume"
                      className="seek h-3 w-0 cursor-pointer opacity-0 transition-all duration-200 group-hover:w-20 group-hover:opacity-100 focus:w-20 focus:opacity-100"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {current && (
                    <>
                      <Link
                        href={`/songs/${current.slug}`}
                        className="rounded-full border border-cream/20 px-3 py-1.5 text-cream/80 transition hover:border-cream/50 hover:text-cream"
                      >
                        Credits
                      </Link>
                      <a
                        href={ytMusicLink(current)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-cream/20 px-3 py-1.5 text-cream/80 transition hover:border-cream/50 hover:text-cream"
                      >
                        YT Music ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StationContext.Provider>
  );
}
