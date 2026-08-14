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
 * Which backdrop is showing at a given moment.
 *
 * Derived from the clock rather than held in state, so the server and the
 * browser always agree on the first paint, every visitor sees the same place at
 * the same time, and a reload does not restart the sequence.
 */
export function themeForTime(ms = Date.now()) {
  return THEMES[Math.floor(ms / SLIDE_MS) % THEMES.length];
}
