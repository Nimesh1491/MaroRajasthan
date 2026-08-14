"use client";

import { THEMES } from "@/data/themes";

/** The backdrop chooser. Scenery only — it changes nothing about the music,
 *  and the hour in India still decides dawn / day / dusk / night. */
export default function ThemePicker({ value, onChange }) {
  const current = THEMES.find((t) => t.slug === value) || THEMES[0];

  return (
    <div className="w-full sm:w-[16rem]">
      <label className="relative block">
        <span className="sr-only">Backdrop</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-cream/25 bg-ink/70 py-2 pl-3 pr-9 text-sm text-cream backdrop-blur transition hover:border-cream/50 focus:border-marigold focus:outline-none"
        >
          {THEMES.map((t) => (
            <option key={t.slug} value={t.slug} className="bg-ink text-cream">
              {t.latin}
            </option>
          ))}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/60"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <p className="mt-1 px-1 text-[10px] leading-snug text-cream/45">
        <span className="font-devanagari text-[13px] text-marigold/80">
          {current.dev}
        </span>{" "}
        · {current.hint}
      </p>
    </div>
  );
}
