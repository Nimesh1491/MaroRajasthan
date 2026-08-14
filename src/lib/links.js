export function ytMusicLink(song) {
  return `https://music.youtube.com/watch?v=${song.youtubeId}`;
}

export function youtubeWatch(song) {
  return `https://www.youtube.com/watch?v=${song.youtubeId}`;
}

export function fmtClock(secs) {
  if (!Number.isFinite(secs)) return "--:--";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
