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

## On a phone and a tablet it is a music player

On anything smaller than a desktop the station is not a narrower page, it is a
different layout: a tab bar at the bottom (`MobileTabBar`), a mini player docked
above it that opens a full-screen now-playing sheet (`MobilePlayer`), and a
player's home screen in place of the poster (`MobileHome`). On a desktop none of
those render and the hero, header and docked bar are exactly as they were.

Where the line falls is decided once, in `globals.css`: the `desk` variant is
1024px and up **with a mouse**, or anything at all from 1367px. Width alone is
not enough — an iPad in landscape is 1024 or 1180px wide and is still an iPad, so
a coarse primary pointer keeps the app dress up to 1366px. Everything the poster
needs is written `desk:`; the plain-CSS half of the same line is the media query
directly beneath the variant, and the two must be changed together.

A few more rules hold it together:

- **The video travels; the iframe never does.** There is one player, and moving
  an iframe in the DOM reloads it — the track would restart. So every place the
  video can appear is an empty placeholder that claims it through
  `setVideoSlot`, and the station walks a single fixed stage over whichever slot
  is on screen: the sheet's frame, the mini player's thumbnail, or the docked
  bar's corner. A frame loop keeps the stage aligned, because the sheet arrives
  on an animation and can be dragged down under a finger. When nothing claims
  it, it parks far off-screen — never hidden, for the reason above.
- **The docked bar's slot is what parks the stage on a phone.** `.dock-desktop`
  in `globals.css` moves the whole bar out of view there, the stage follows its
  slot out, and playback carries on.
- **The sheet's entry animation must not have a fill mode.** A filled animation
  keeps its last keyframe applied for the life of the element and outranks an
  inline style, which leaves the sheet unable to follow the finger dragging it
  down.
- **No Media Session.** Publishing our own metadata and play/pause handlers is
  the obvious way to get lock-screen controls, but the audio lives in a
  cross-origin iframe running its own session, and the two disagree: the
  notification pauses a track that is still playing. YouTube's embed already
  puts controls in the shade.
- **Sleeves are the uploads' own thumbnails.** `CoverArt` walks maxres → mq → hq
  and paints a medallion if none of them load. Nothing new is hosted here.
- **The home screen is काका, and nothing else.** `MobileHome` opens with the
  figure at the top of the screen, in his own light, the greeting and the clock
  under him, and two buttons: play everything shuffled, or go and pick. No banner
  behind him, and no list of collections — that list is one tap away in the tab
  bar and on the button, and a face reads faster than four rows of names.
- **काका is drawn, not dropped in.** `Kaka.js` is one hand-authored SVG — the
  safa wound in four folds over a leheriya stripe with its end hanging behind the
  shoulder, the moustache, an angarkha over a marigold patka, a kada at each
  wrist, a murki in one ear, jhola, mojari, lathi — in the station's own palette,
  so it stays crisp from 110px to 400px, costs no request and carries no licence.
  One thing to know if you touch it: the moustache is outlined in cream rather
  than ink, because it hangs out past his face onto an ink page, and an ink line
  there would leave him clean-shaven.
- The heights of the fixed chrome live in `globals.css` as `--tabbar-h` and
  `--mini-h`; pages clear them through `body[data-player]`, which the station
  sets. A page should never guess at that padding itself.
- `app/manifest.js` makes it installable, and `viewportFit: "cover"` means the
  notch and home bar are measured — hence `app-safe-top` and `--safe-b`. There is
  no service worker and nothing is cached: the collections are read live, and a
  station playing a stale playlist offline would be lying about what it is.
