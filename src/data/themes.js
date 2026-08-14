// The illustrated backdrops. Each is a place in Rajasthan, drawn rather than
// photographed, and each carries a tint that survives the time-of-day palette
// so the blue city still reads blue at dusk and the pink city still reads pink.
//
// The scene is scenery only: it does not affect what is playing, and the hour
// in India still decides whether it is dawn, day, dusk or night.

export const THEMES = [
  {
    slug: "thar-dhora",
    dev: "थार रा धोरा",
    latin: "Thar Dunes",
    hint: "Dunes, camels and a lit baithak",
    tint: "#c98f4a",
  },
  {
    slug: "neelo-shehar",
    dev: "नीलो शहर",
    latin: "Jodhpur Blue City",
    hint: "Mehrangarh over the blue houses",
    tint: "#3f74b8",
  },
  {
    slug: "sonar-quila",
    dev: "सोनार किलो",
    latin: "Jaisalmer Fort",
    hint: "Sandstone bastions and havelis",
    tint: "#d9a640",
  },
  {
    slug: "pichola",
    dev: "पिछोला",
    latin: "Udaipur Lake",
    hint: "Palace on the water, ghats and boats",
    tint: "#4aa3a0",
  },
  {
    slug: "hawa-mahal",
    dev: "हवा महल",
    latin: "Jaipur Pink City",
    hint: "The honeycomb of jharokhas",
    tint: "#c9566a",
  },
  {
    slug: "sambhar",
    dev: "साँभर",
    latin: "Sambhar Salt Lake",
    hint: "Salt pans, flamingos and a low horizon",
    tint: "#b9c6d4",
  },
];

export const DEFAULT_THEME = "thar-dhora";

/** How long each backdrop stays up before the next one fades in. */
export const SLIDE_MS = 10 * 60 * 1000;

export function themeBySlug(slug) {
  return THEMES.find((t) => t.slug === slug) || THEMES[0];
}

/**
 * Which backdrop is showing.
 *
 * The slide number comes from the clock, so the sequence keeps turning over on
 * its own every ten minutes and a reload does not restart it. `offset` is drawn
 * fresh on each page load, so you get a different place each time you arrive
 * rather than always opening on the same one.
 *
 * The server renders with offset 0, which keeps the first paint deterministic;
 * the browser picks its own offset on mount and the change is crossfaded.
 */
export function themeForTime(ms = Date.now(), offset = 0) {
  const slide = Math.floor(ms / SLIDE_MS);
  return THEMES[(((slide + offset) % THEMES.length) + THEMES.length) % THEMES.length];
}
