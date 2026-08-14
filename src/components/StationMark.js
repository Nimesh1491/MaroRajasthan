// The station badge: a kamaicha (the Manganiyar bowed lute) inside a scalloped
// lac-red medallion, the way a shop sign in Jodhpur would paint it.

export default function StationMark({ size = 40 }) {
  const petals = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="shrink-0"
    >
      <g transform="translate(50 50)">
        {petals.map((a) => (
          <circle
            key={a}
            cx={Math.cos((a * Math.PI) / 180) * 43}
            cy={Math.sin((a * Math.PI) / 180) * 43}
            r="8.5"
            fill="var(--color-lac)"
          />
        ))}
        <circle r="44" fill="var(--color-lac)" />
        <circle r="39" fill="var(--color-ink)" />
        <circle r="36" fill="none" stroke="var(--color-marigold)" strokeWidth="2" />
        {/* kamaicha: round gourd body, long neck, bow across it */}
        <g transform="rotate(-28)">
          <circle cx="0" cy="12" r="15" fill="var(--color-cream)" />
          <circle cx="0" cy="12" r="5" fill="var(--color-lac)" />
          <rect x="-3.5" y="-30" width="7" height="34" rx="2.5" fill="var(--color-cream)" />
          <rect x="-7" y="-33" width="14" height="7" rx="3" fill="var(--color-marigold)" />
        </g>
        <rect
          x="-32"
          y="-2"
          width="64"
          height="3.4"
          rx="1.7"
          fill="var(--color-marigold)"
          transform="rotate(34)"
        />
      </g>
    </svg>
  );
}
