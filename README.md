# Maro Rajasthan

A free station that plays Rajasthani folk. Four collections, each read live from
a YouTube playlist — pick one and it plays straight through.

**Live at [maro-rajasthan.vercel.app](https://maro-rajasthan.vercel.app)**


## Running it

```bash
npm install
npm run dev      # http://localhost:3020
npm run build    # production build
npm start        # serve the production build on 3020
```

No environment variables, no database, no API keys.

## How it works

- **Collections are read live.** `src/lib/playlist-fetch.js` reads a public
  YouTube playlist through YouTube's own internal endpoint (no API key).
  `src/lib/playlist.js` wraps that in a ten-minute cache, and every page sets
  `export const revalidate = 600`. Add, delete or reorder a track on a playlist
  and the site follows within ten minutes.
- **The checked-in copy enriches it.** `src/data/catalogue.js` and the
  `collection-*.js` files hold Devanagari titles, genre labels and notes,
  matched to live tracks by video id (and by `altIds`, where the same recording
  appears on a playlist under a different upload). A playlist track with no
  match still appears and still plays, flagged "newly added".
- **It degrades rather than breaks.** If YouTube cannot be reached the
  collection falls back to the checked-in copy and the page says so.
- **Playback** is the YouTube IFrame API. Nothing is hosted here; every track
  streams from its own upload. The player is handed its queue by the server,
  because the client has no copy of the live catalogue.

## Things worth knowing before changing it

- `export const revalidate` must be a **literal**. Next statically analyses
  segment config and rejects an imported constant.
- Never hide the player iframe with `display:none` or shrink it to zero — that
  can suspend playback. Move it out of view instead; see `Station.js`.
- Collection copy should not carry track counts. The collections are live, so a
  number written into a blurb goes stale the moment a playlist changes. The
  count is rendered from the live data next to the title.
- Entries in `CORE_SONGS` with `collections: []` are reserve: they have no page
  of their own and exist only to enrich matching playlist tracks.
