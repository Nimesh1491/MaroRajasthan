// Installable, so the station can sit on a phone's home screen and open
// chromeless — which is the point of the mobile layout. No service worker and
// nothing cached: the collections are read live, and a station that played a
// stale playlist offline would be lying about what it is.

export default function manifest() {
  return {
    name: "Maro Rajasthan — Rajasthani folk, playing live",
    short_name: "Maro Rajasthan",
    description:
      "A free station that plays Rajasthani folk. Four collections, each read live from a YouTube playlist — pick one and it plays straight through.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#150f18",
    theme_color: "#150f18",
    lang: "en-IN",
    categories: ["music", "entertainment"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
