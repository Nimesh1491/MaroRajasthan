import { unstable_cache } from "next/cache";
import { readPlaylistSafely } from "./playlist-fetch.js";

// Cached read of a YouTube playlist. Adding, deleting or reordering a track on
// the playlist shows up on the site within this window.
//
// The transport lives in playlist-fetch.js, which imports nothing from Next so
// it can also be run by plain Node.

export const REVALIDATE_SECONDS = 600;

export const getPlaylist = unstable_cache(
  async (playlistId) => readPlaylistSafely(playlistId),
  ["yt-playlist"],
  { revalidate: REVALIDATE_SECONDS, tags: ["playlist"] }
);
