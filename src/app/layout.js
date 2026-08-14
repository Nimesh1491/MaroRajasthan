import { Inter, Rozha_One } from "next/font/google";
import "./globals.css";
import { StationProvider } from "@/components/Station";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rozha = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

const TITLE = "Maro Rajasthan — Rajasthani folk, playing live";
// No collection count here: the collections are read live, so a number written
// into the description goes stale the moment a playlist changes.
const DESCRIPTION =
  "A free station that plays Rajasthani folk — bhajans, ghoomar, banna geet and the contemporary Marwari hits. Every collection is read live from its YouTube playlist. Pick one and it plays out loud.";

export const metadata = {
  // Needed for the social-card URLs to come out absolute.
  metadataBase: new URL("https://maro-rajasthan.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Maro Rajasthan",
  openGraph: {
    type: "website",
    siteName: "Maro Rajasthan",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// themeColor lives on `viewport`, not `metadata` — Next warns on every route
// if it is put in the wrong export.
export const viewport = {
  themeColor: "#150f18",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${rozha.variable}`}>
      <body className="font-sans antialiased">
        <StationProvider>{children}</StationProvider>
      </body>
    </html>
  );
}
