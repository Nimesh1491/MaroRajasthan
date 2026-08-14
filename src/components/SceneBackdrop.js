// The illustrated backdrop, drawn rather than photographed: a haveli baithak
// lit from inside, a chhatri skyline behind it, dunes, a camel caravan, and a
// sky that changes with the hour in India. The scene is scenery only — it does
// not decide, and is not decided by, which album is playing.

const PALETTES = {
  night: {
    skyTop: "#08060f",
    skyMid: "#171130",
    skyLow: "#3a2450",
    disc: "#f6e8d0",
    discGlow: "#8f7fc0",
    discY: 190,
    discR: 44,
    stars: 0.9,
    fort: "#241a3c",
    town: "#1d1430",
    dune1: "#2a1d3a",
    dune2: "#1d1428",
    dune3: "#130d1a",
    fg: "#0b0810",
    lamp: "#e8ab2e",
    lampAlpha: 0.5,
  },
  dawn: {
    skyTop: "#241a3b",
    skyMid: "#6b3a55",
    skyLow: "#e0894f",
    disc: "#ffe6b0",
    discGlow: "#f2a45c",
    discY: 470,
    discR: 52,
    stars: 0.2,
    fort: "#5a3648",
    town: "#432b3d",
    dune1: "#8a5545",
    dune2: "#5c3733",
    dune3: "#2f1c22",
    fg: "#1a1016",
    lamp: "#e8ab2e",
    lampAlpha: 0.3,
  },
  day: {
    skyTop: "#2c5b8c",
    skyMid: "#6f9dc0",
    skyLow: "#d9c79f",
    disc: "#fff6dc",
    discGlow: "#ffe9a8",
    discY: 140,
    discR: 34,
    stars: 0,
    fort: "#8d7a63",
    town: "#7b664f",
    dune1: "#c9a875",
    dune2: "#9c7f56",
    dune3: "#5f4b34",
    fg: "#33281c",
    lamp: "#e8ab2e",
    lampAlpha: 0.18,
  },
  dusk: {
    skyTop: "#1f0c2c",
    skyMid: "#7a2a3e",
    skyLow: "#e0862f",
    disc: "#ffd98a",
    discGlow: "#e86a2a",
    discY: 430,
    discR: 58,
    stars: 0.35,
    fort: "#4a2233",
    town: "#3a1a2c",
    dune1: "#7d3a33",
    dune2: "#4e2225",
    dune3: "#2a1218",
    fg: "#150a10",
    lamp: "#e8ab2e",
    lampAlpha: 0.42,
  },
};

const STARS = [
  [120, 90], [260, 150], [380, 70], [520, 130], [640, 60], [760, 110],
  [900, 80], [1040, 145], [1180, 65], [1320, 120], [180, 210], [430, 235],
  [700, 200], [980, 230], [1250, 205], [60, 160], [1400, 175], [340, 120],
  [860, 175], [1120, 100],
];

/** One seated musician silhouette. */
function Musician({ x, y, scale = 1, fill, prop }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={fill}>
      <circle cx="0" cy="-46" r="13" />
      <path d="M-19 0 C-19 -30 -9 -36 0 -36 C9 -36 19 -30 19 0 Z" />
      <path d="M-27 0 h54 v6 h-54 Z" />
      {prop === "sarangi" && (
        <g>
          <rect x="6" y="-34" width="9" height="30" rx="4" />
          <rect x="-24" y="-30" width="42" height="3" rx="1.5" transform="rotate(-18)" />
        </g>
      )}
      {prop === "dholak" && <ellipse cx="16" cy="-10" rx="13" ry="10" />}
      {prop === "khartal" && (
        <g>
          <rect x="-26" y="-40" width="8" height="12" rx="2" />
          <rect x="18" y="-44" width="8" height="12" rx="2" />
        </g>
      )}
    </g>
  );
}

export default function SceneBackdrop({ scene = "night" }) {
  const p = PALETTES[scene] || PALETTES.night;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyTop} />
            <stop offset="55%" stopColor={p.skyMid} />
            <stop offset="100%" stopColor={p.skyLow} />
          </linearGradient>
          <radialGradient id="discGlow">
            <stop offset="0%" stopColor={p.discGlow} stopOpacity="0.75" />
            <stop offset="100%" stopColor={p.discGlow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lampGlow">
            <stop offset="0%" stopColor={p.lamp} stopOpacity={p.lampAlpha} />
            <stop offset="60%" stopColor={p.lamp} stopOpacity={p.lampAlpha * 0.28} />
            <stop offset="100%" stopColor={p.lamp} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
            <stop offset="50%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.8" />
          </radialGradient>
          {/* A soft scrim right where the wordmark sits, so the type reads at
              any time of day without dimming the whole illustration. */}
          <radialGradient id="titleScrim" cx="50%" cy="42%" r="46%">
            <stop offset="0%" stopColor="#0d0812" stopOpacity="0.62" />
            <stop offset="70%" stopColor="#0d0812" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0d0812" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="baseFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#150f18" stopOpacity="0" />
            <stop offset="100%" stopColor="#150f18" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect width="1440" height="900" fill="url(#sky)" />

        {/* stars */}
        {p.stars > 0 &&
          STARS.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 4 === 0 ? 1.9 : 1.2}
              fill="#f6e8d0"
              opacity={p.stars}
              style={{
                animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.31}s infinite`,
              }}
            />
          ))}

        {/* sun or moon */}
        <circle cx="1090" cy={p.discY} r={p.discR * 5} fill="url(#discGlow)" />
        <circle cx="1090" cy={p.discY} r={p.discR} fill={p.disc} opacity="0.92" />

        {/* Mehrangarh-ish fort on the far ridge */}
        <g fill={p.fort}>
          <path d="M0 560 L60 548 L120 520 L150 470 L250 452 L300 470 L360 462 L420 486 L520 478 L560 500 L640 508 L700 530 L760 545 L820 556 L900 560 L1440 566 L1440 620 L0 620 Z" />
          <path d="M170 470 h150 v-34 h-12 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-12 Z" />
          <rect x="196" y="404" width="24" height="34" />
          <rect x="262" y="398" width="26" height="40" />
          <path d="M196 404 q12 -22 24 0 Z" />
          <path d="M262 398 q13 -24 26 0 Z" />
        </g>

        {/* town skyline: chhatris and haveli roofs */}
        <g fill={p.town}>
          <rect x="0" y="596" width="1440" height="120" />
          {[
            [90, 560, 1],
            [1010, 552, 1.15],
            [1210, 568, 0.85],
            [1348, 556, 1],
          ].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              {/* chhatri: dome on four pillars */}
              <path d="M-40 0 h80 v-8 h-80 Z" />
              <path d="M-34 -8 q34 -46 68 0 Z" />
              <rect x="-2" y="-62" width="4" height="14" />
              <circle cx="0" cy="-64" r="5" />
              <rect x="-34" y="0" width="7" height="42" />
              <rect x="-12" y="0" width="7" height="42" />
              <rect x="6" y="0" width="7" height="42" />
              <rect x="27" y="0" width="7" height="42" />
            </g>
          ))}
          {/* flat haveli blocks with jharokha openings */}
          <rect x="330" y="566" width="150" height="80" />
          <rect x="640" y="576" width="120" height="70" />
          <rect x="820" y="584" width="110" height="62" />
        </g>

        {/* far dune */}
        <path
          d={`M0 660 C220 618 380 690 600 662 C820 634 980 700 1200 664 C1320 644 1400 660 1440 654 L1440 900 L0 900 Z`}
          fill={p.dune1}
        />

        {/* khejri trees + camel caravan on the far dune */}
        <g fill={p.dune2}>
          {[
            [170, 668, 1],
            [1075, 672, 0.85],
            [1290, 664, 1.1],
          ].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <rect x="-3" y="-34" width="6" height="34" />
              <path d="M-30 -34 q30 -26 60 0 q-30 -12 -60 0 Z" />
              <path d="M-22 -44 q22 -20 44 0 q-22 -9 -44 0 Z" />
            </g>
          ))}
          {/* camels */}
          {[
            [990, 676, 0.9],
            [1042, 680, 0.78],
          ].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <path d="M-24 0 v-14 q0 -10 8 -12 q4 -12 12 -12 q8 0 11 10 q7 -2 9 6 l3 22 h-6 l-3 -16 l-22 2 l-2 14 Z" />
              <path d="M-20 0 l-2 14 h4 l3 -14 Z" />
              <path d="M14 0 l2 14 h4 l-2 -14 Z" />
              <path d="M13 -28 q9 -6 14 2 l-3 6 Z" />
            </g>
          ))}
        </g>

        {/* near dune */}
        <path
          d={`M0 744 C260 706 460 776 720 748 C960 722 1140 786 1440 744 L1440 900 L0 900 Z`}
          fill={p.dune3}
        />

        {/* The baithak — lit from inside. Pushed down and scaled so the lamp
            glow sits under the wordmark rather than behind it. */}
        <g transform="translate(86.4 150) scale(0.88)">
          <circle cx="720" cy="620" r="300" fill="url(#lampGlow)" />
          {/* lit opening with a Rajasthani multi-foil arch */}
          <path
            d="M560 780 L560 560 Q560 500 620 490 Q650 462 690 470 Q720 440 750 470 Q790 462 820 490 Q880 500 880 560 L880 780 Z"
            fill={p.lamp}
            opacity={p.lampAlpha * 0.55}
          />
          <path
            d="M578 780 L578 566 Q578 514 630 506 Q656 482 692 490 Q720 464 748 490 Q784 482 810 506 Q862 514 862 566 L862 780 Z"
            fill="#f2c46a"
            opacity={p.lampAlpha * 0.34}
          />
          {/* three musicians in the doorway */}
          <g opacity="0.92">
            <Musician x={648} y={772} scale={1.05} fill={p.fg} prop="sarangi" />
            <Musician x={722} y={778} scale={1.15} fill={p.fg} prop="khartal" />
            <Musician x={800} y={772} scale={1.05} fill={p.fg} prop="dholak" />
          </g>
          {/* chhajja — the stone eave over the opening */}
          <path d="M508 500 L932 500 L900 470 L540 470 Z" fill={p.fg} />
          <rect x="500" y="494" width="440" height="12" rx="4" fill={p.fg} />
          {/* hanging lamps */}
          {[600, 720, 840].map((x, i) => (
            <g key={x}>
              <rect x={x - 1} y="506" width="2" height="26" fill={p.fg} />
              <circle
                cx={x}
                cy="538"
                r="7"
                fill={p.lamp}
                className="lamp-glow"
                style={{ animationDelay: `${i * 1.3}s` }}
              />
            </g>
          ))}
        </g>

        {/* foreground: charpai on the left, a cart wheel on the right */}
        <g fill={p.fg}>
          <g transform="translate(210 810)">
            <rect x="-120" y="-10" width="240" height="12" rx="4" />
            <rect x="-116" y="2" width="10" height="56" />
            <rect x="106" y="2" width="10" height="56" />
            <rect x="-60" y="2" width="8" height="46" />
            <rect x="52" y="2" width="8" height="46" />
            <Musician x={-40} y={-10} scale={0.9} fill={p.fg} />
          </g>
          <g transform="translate(1250 826)">
            <circle cx="0" cy="0" r="54" fill="none" stroke={p.fg} strokeWidth="10" />
            <circle cx="0" cy="0" r="9" />
            {[0, 45, 90, 135].map((a) => (
              <rect
                key={a}
                x="-50"
                y="-3"
                width="100"
                height="6"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
          <path d="M0 858 C300 838 700 880 1080 856 C1260 844 1380 862 1440 856 L1440 900 L0 900 Z" />
        </g>

        <rect width="1440" height="900" fill="url(#vignette)" />
        <rect width="1440" height="900" fill="url(#titleScrim)" />
        <rect y="700" width="1440" height="200" fill="url(#baseFade)" />
      </svg>

      {/* film grain */}
      <div
        className="grain absolute -inset-[10%] opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
