"use client";

import Link from "next/link";
import { useStation } from "./Station";

const PlayIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5l12 7-12 7z" />
  </svg>
);

/** Plays a whole collection. The queue is resolved on the server and handed
 *  down, because playlist-backed collections are read live. */
export function PlayCollectionButton({
  songs,
  collection,
  label = "Play this collection",
}) {
  const station = useStation();
  return (
    <button
      onClick={() => station.play(songs, 0, collection)}
      className="inline-flex items-center gap-2.5 rounded-full bg-lac px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-[#d82049]"
    >
      <PlayIcon />
      {label}
    </button>
  );
}

/** Plays one song, dropped into its collection so the rest follows on. */
export function PlaySongButton({
  song,
  songs,
  collection,
  label = "Play in the baithak",
}) {
  const station = useStation();
  const queue = songs?.length ? songs : [song];
  return (
    <button
      onClick={() => station.playAt(queue, song.slug, collection)}
      className="inline-flex items-center gap-2.5 rounded-full bg-lac px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-[#d82049]"
    >
      <PlayIcon />
      {label}
    </button>
  );
}

/** One line of a collection's running order. Clicking the row drops the
 *  station into that collection at that track; the title still links to the
 *  credits. */
export function TrackRow({ song, n, songs, collection }) {
  const station = useStation();
  const isCurrent = station.current?.slug === song.slug;
  const isBlocked = station.blocked.includes(song.slug);

  return (
    <li
      className={`group flex items-center gap-4 border-b border-cream/8 py-3.5 transition ${
        isCurrent ? "bg-cream/[0.04]" : "hover:bg-cream/[0.03]"
      }`}
    >
      <button
        onClick={() => station.playAt(songs, song.slug, collection)}
        aria-label={`Play ${song.latin}`}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs text-cream/40 transition group-hover:bg-lac group-hover:text-cream"
      >
        <span className="group-hover:hidden">
          {isCurrent && station.playing ? "▮▮" : n}
        </span>
        <span className="hidden group-hover:block">
          <PlayIcon size={10} />
        </span>
      </button>

      <div className="min-w-0 flex-1">
        <Link
          href={`/songs/${song.slug}`}
          className={`block leading-tight text-cream transition hover:text-marigold ${
            song.dev ? "font-devanagari text-lg" : "text-base font-medium"
          }`}
        >
          {song.dev || song.latin}
        </Link>
        <p className="truncate text-sm text-cream/60">
          {song.dev ? song.latin : song.singers || "—"}
          {song.source ? ` · ${song.source}` : ""}
          {song.unenriched && (
            <span className="ml-2 text-marigold/70">· newly added</span>
          )}
          {isBlocked && (
            <span className="ml-2 text-marigold/80">
              — this upload refuses embedding; the station skips it
            </span>
          )}
        </p>
      </div>

      {song.region && (
        <span className="hidden shrink-0 text-xs text-cream/35 sm:block">
          {song.region}
        </span>
      )}
      <span className="shrink-0 font-mono text-xs text-cream/45">
        {song.length}
      </span>
    </li>
  );
}
