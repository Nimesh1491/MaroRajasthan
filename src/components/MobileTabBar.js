"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStation } from "./Station";

/**
 * The phone's tab bar.
 *
 * A page this small should not be navigated through a header: on a phone the
 * station is a player, so it gets a player's furniture. Four tabs, the last of
 * which is the record that is playing — it opens the now-playing sheet rather
 * than a route, and stays dim until there is something to open.
 *
 * Not rendered on a desktop, where the header and the docked bar do this job.
 */
export default function MobileTabBar() {
  const pathname = usePathname();
  const station = useStation();

  const tabs = [
    { href: "/", label: "Station", icon: HomeIcon, match: (p) => p === "/" },
    {
      href: "/collections",
      label: "Collections",
      icon: StackIcon,
      match: (p) => p.startsWith("/collections"),
    },
    {
      href: "/songs",
      label: "Songs",
      icon: NoteIcon,
      match: (p) => p.startsWith("/songs"),
    },
  ];

  return (
    <nav
      aria-label="Station"
      className="app-tabbar fixed inset-x-0 bottom-0 z-50 border-t border-cream/12 bg-ink/95 backdrop-blur desk:hidden"
    >
      <ul className="mx-auto flex h-[3.8rem] max-w-2xl items-stretch">
        {tabs.map((t) => {
          const on = t.match(pathname);
          const Icon = t.icon;
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 transition ${
                  on ? "text-marigold" : "text-cream/55"
                }`}
              >
                <Icon />
                <span className="text-[10px] tracking-[0.08em]">{t.label}</span>
              </Link>
            </li>
          );
        })}

        <li className="flex-1">
          <button
            onClick={() => station.started && station.setExpanded(true)}
            disabled={!station.started}
            aria-label={station.started ? "Open the player" : "Nothing playing yet"}
            className={`flex h-full w-full flex-col items-center justify-center gap-1 transition ${
              station.started ? "text-cream/85" : "text-cream/25"
            }`}
          >
            <span className={station.playing ? "sleeve-spin" : undefined}>
              <DiscIcon />
            </span>
            <span className="text-[10px] tracking-[0.08em]">Playing</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

const HomeIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11l8-6.5 8 6.5" />
    <path d="M6 10.5V20h12v-9.5" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

const StackIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);

const NoteIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h10M4 11h10M4 16h6" />
    <circle cx="17" cy="16.5" r="3" />
    <path d="M20 16.5V7l-3 1" />
  </svg>
);

const DiscIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    <path d="M12 4a8 8 0 015.7 2.4" strokeLinecap="round" opacity="0.55" />
  </svg>
);
