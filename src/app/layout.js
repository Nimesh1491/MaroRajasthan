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

export const metadata = {
  title: "Maro Rajasthan — Rajasthani folk, playing live",
  description:
    "A free station that plays Rajasthani folk: Manganiyar and Langa recordings, Meera's bhajans, ghoomar and banna geet, and the film songs the desert produced. Five collections — pick one and it plays.",
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
