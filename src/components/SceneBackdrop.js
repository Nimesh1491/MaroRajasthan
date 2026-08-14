// The illustrated backdrop, drawn rather than photographed.
//
// Two things decide what you see, and they are independent:
//   - `scene` is the time of day, from the hour in India (lib/ist.js). It sets
//     the sky, the sun or moon, and how dark the ground reads.
//   - `theme` is the place, chosen by the listener (data/themes.js). It decides
//     the architecture and the tint.
//
// Neither has anything to do with what is playing.
//
// Depth comes from four things applied consistently across every scene:
//   1. a single light source, at the sun/moon (upper right), so every solid has
//      a lit right face and a shadowed left one;
//   2. atmospheric haze — distant layers dissolve toward the sky colour at
//      their base, near layers barely at all;
//   3. surface gradients rather than flat fills, so nothing reads as a sticker;
//   4. progressive darkening front to back, with the foreground nearly black.

import { themeBySlug } from "@/data/themes";

/* ------------------------------------------------------------ colour maths */

const toRgb = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const toHex = (c) =>
  "#" +
  c
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("");
const mix = (a, b, t) => {
  const [x, y] = [toRgb(a), toRgb(b)];
  return toHex(x.map((v, i) => v + (y[i] - v) * t));
};
const lit = (c, t = 0.2) => mix(c, "#ffffff", t);
const shade = (c, t = 0.28) => mix(c, "#000000", t);

const PALETTES = {
  night: {
    skyTop: "#07060e",
    skyMid: "#141029",
    skyLow: "#33223f",
    disc: "#f6e8d0",
    discGlow: "#8f7fc0",
    discY: 190,
    discR: 44,
    stars: 0.9,
    clouds: 0.1,
    far: "#241a3c",
    mid: "#1d1430",
    near: "#171024",
    fg: "#0a0710",
    water: "#171634",
    lamp: "#e8ab2e",
    lampAlpha: 0.62,
    tintAlpha: 0.26,
    litAmt: 0.1,
  },
  dawn: {
    skyTop: "#241a3b",
    skyMid: "#6b3a55",
    skyLow: "#e79a5c",
    disc: "#ffe6b0",
    discGlow: "#f2a45c",
    discY: 470,
    discR: 52,
    stars: 0.22,
    clouds: 0.5,
    far: "#68455a",
    mid: "#7a4a44",
    near: "#4a2a2e",
    fg: "#1c1016",
    water: "#8a5a52",
    lamp: "#e8ab2e",
    lampAlpha: 0.4,
    tintAlpha: 0.46,
    litAmt: 0.24,
  },
  day: {
    skyTop: "#2b5f92",
    skyMid: "#7cabcc",
    skyLow: "#dcccab",
    disc: "#fff9e6",
    discGlow: "#ffeeb4",
    discY: 140,
    discR: 34,
    stars: 0,
    clouds: 0.9,
    far: "#8f7f69",
    mid: "#a68d6c",
    near: "#755c40",
    fg: "#291f14",
    water: "#86b0cb",
    lamp: "#e8ab2e",
    lampAlpha: 0.16,
    tintAlpha: 0.8,
    litAmt: 0.3,
  },
  dusk: {
    skyTop: "#1d0b2b",
    skyMid: "#7c2c40",
    skyLow: "#e78c34",
    disc: "#ffd98a",
    discGlow: "#e86a2a",
    discY: 430,
    discR: 58,
    stars: 0.35,
    clouds: 0.7,
    far: "#5a2a3a",
    mid: "#6d3540",
    near: "#3a1a22",
    fg: "#160b11",
    water: "#743744",
    lamp: "#e8ab2e",
    lampAlpha: 0.52,
    tintAlpha: 0.44,
    litAmt: 0.22,
  },
};

const STARS = [
  [120, 90], [260, 150], [380, 70], [520, 130], [640, 60], [760, 110],
  [900, 80], [1040, 145], [1180, 65], [1320, 120], [180, 210], [430, 235],
  [700, 200], [980, 230], [1250, 205], [60, 160], [1400, 175], [340, 120],
  [860, 175], [1120, 100], [220, 60], [560, 190], [1010, 55], [1380, 240],
];

const CLOUDS = [
  [200, 150, 260, 26],
  [560, 105, 200, 20],
  [980, 190, 300, 30],
  [1300, 130, 220, 22],
  [760, 250, 180, 16],
];

/** Light comes from the sun/moon at x≈1090, so right faces catch it. */
const LIGHT_X = 1090;

/* ------------------------------------------------------------------ atoms */

function Chhatri({ x, y, s = 1, base, p }) {
  const l = lit(base, p.litAmt);
  const d = shade(base);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 0 h80 v-8 h-80 Z" fill={d} />
      <path d="M-34 -8 q34 -46 68 0 Z" fill={base} />
      <path d="M0 -33 q17 4 34 25 L0 -8 Z" fill={l} opacity="0.85" />
      <rect x="-2" y="-62" width="4" height="14" fill={d} />
      <circle cx="0" cy="-64" r="5" fill={l} />
      {[-34, -12, 6, 27].map((px, i) => (
        <g key={px}>
          <rect x={px} y="0" width="7" height="42" fill={i > 1 ? base : d} />
          <rect x={px + 5} y="0" width="2" height="42" fill={l} opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

/**
 * A dromedary, in side view, facing left. Built from separate parts rather than
 * one blob: far legs behind the body, then barrel and hump, then the neck
 * sweeping up to a small head, then the near legs. The proportions that make it
 * read as a camel and not a horse are the long legs, the deep chest, the single
 * hump set back, and the neck leaving the chest low and rising in an S.
 */
/**
 * A dromedary in side view, facing left, drawn as one continuous outline.
 *
 * The proportions that decide whether this reads as a camel rather than a horse
 * are, in order: a deep brisket that drops below the belly line, a neck that
 * leaves the top of that chest and rises in a shallow S, a single hump set back
 * over the barrel, and legs long enough to look ungainly. An earlier version
 * built from separate body/neck/head shapes read as a blob with a stick on it,
 * because the chest was missing and the neck met a hollow.
 */
const CAMEL_OUTLINE =
  "M-19 0 L-17 -12 C-16.5 -16.5 -17.5 -19 -18 -21.5 C-22 -22.8 -25.2 -25.2 -26.2 -29.5 " +
  "C-27.2 -34 -28.2 -39 -30.2 -44 C-32.8 -50 -35.8 -55.5 -37.8 -59.5 " +
  "C-39.3 -62.8 -42.3 -66 -45.8 -65.5 C-49.3 -65 -52.3 -62.5 -53.3 -60 " +
  "C-54.1 -58 -52.3 -56.5 -49.8 -56.8 C-46.8 -57.2 -43.8 -56 -41.8 -54.5 " +
  "C-38.3 -51.5 -34.8 -47.5 -30.8 -42.5 C-25.8 -37 -19.3 -34.5 -13.3 -35 " +
  "C-7.3 -35.5 -3.3 -41.5 -0.8 -47.5 C1.7 -53.5 6.7 -55.5 9.7 -51 " +
  "C12.2 -47 13.7 -42.5 15.7 -39.5 C18.7 -36.5 21.7 -34.5 23.2 -31.5 " +
  "C24.7 -28.5 25 -25.5 24.2 -23 L21.7 -23 C22.2 -17.5 22.7 -14.5 21.2 -11.5 " +
  "L18.7 0 L15.2 0 L17.7 -11.5 C18.7 -15.5 18.2 -19 17.7 -22.5 " +
  "C8 -21 -2 -21 -11 -22 L-9.5 -12 L-13 0 Z";

function Camel({ x, y, s = 1, fill }) {
  const far = shade(fill, 0.3);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* off-side legs first, a shade darker, so the animal has depth */}
      <g fill={far}>
        <path d="M-10 -22 L-6.5 -22 L-5.5 -12 L-7 0 L-10.5 0 L-9 -12 Z" />
        <path d="M8.5 -22 L12 -22 L13 -12.5 L10.5 0 L7 0 L10 -12.5 Z" />
      </g>
      <path d={CAMEL_OUTLINE} fill={fill} />
      <path d="M23.2 -29.5 C27.7 -27 27.7 -18.5 24.7 -14 L22.7 -15 C25.2 -19 25.2 -23.5 21.2 -26.5 Z" fill={fill} />
      <path d="M-40 -63 L-38.4 -66.8 L-36.4 -62.6 Z" fill={fill} />
    </g>
  );
}

function Khejri({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M-2 0 l-1 -30 l-6 -12 l7 8 l1 -10 l5 -9 l-3 11 l6 -7 l-4 10 l1 17 Z" />
      <path d="M-32 -36 q32 -30 64 0 q-32 -13 -64 0 Z" />
      <path d="M-24 -47 q24 -22 48 0 q-24 -10 -48 0 Z" />
      <path d="M-14 -56 q14 -14 28 0 q-14 -6 -28 0 Z" />
    </g>
  );
}

function Birds({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round">
      <path d="M0 0 q6 -5 11 0 q5 -5 11 0" />
      <path d="M28 14 q5 -4 9 0 q4 -4 9 0" opacity="0.8" />
      <path d="M-22 20 q4 -3 8 0 q4 -3 8 0" opacity="0.65" />
    </g>
  );
}

/** A lit window recess: a dark opening with warm light inside it. */
function Windows({ x, y, cols, rows, gap = 26, w = 12, h = 17, p, warm = 1 }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = (r * 31 + c * 17) % 5 !== 0; // a few unlit, so it reads as lived in
      cells.push(
        <g key={`${r}-${c}`} transform={`translate(${c * gap} ${r * gap})`}>
          <path
            d={`M0 ${h} L0 ${h * 0.45} Q0 -2 ${w / 2} -2 Q${w} -2 ${w} ${h * 0.45} L${w} ${h} Z`}
            fill="#000"
            opacity="0.5"
          />
          {on && (
            <path
              d={`M1.5 ${h} L1.5 ${h * 0.45} Q1.5 -0.5 ${w / 2} -0.5 Q${w - 1.5} -0.5 ${w - 1.5} ${h * 0.45} L${w - 1.5} ${h} Z`}
              fill={p.lamp}
              opacity={p.lampAlpha * warm}
            />
          )}
        </g>
      );
    }
  }
  return <g transform={`translate(${x} ${y})`}>{cells}</g>;
}

/** Horizontal stone courses — cheap, and it stops big faces reading as slabs. */
function Courses({ x, y, w, h, step = 13, opacity = 0.13 }) {
  const lines = [];
  for (let i = step; i < h; i += step) {
    lines.push(<rect key={i} x={x} y={y + i} width={w} height="1" fill="#000" opacity={opacity} />);
  }
  return <>{lines}</>;
}

/* ----------------------------------------------------------------- scenes */

function TharDunes({ p, tint }) {
  const sand = mix(p.near, tint, p.tintAlpha * 0.6);
  return (
    <>
      {/* far ridge, dissolving into haze */}
      <path
        d="M0 566 L70 552 L128 520 L156 470 L252 452 L302 470 L362 462 L424 486 L520 478 L562 500 L642 508 L702 530 L764 546 L822 556 L902 560 L1440 570 L1440 640 L0 640 Z"
        fill="url(#farPaint)"
      />
      <path d="M170 470 h150 v-34 h-12 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-12 Z" fill={shade(p.far, 0.2)} />

      <g>
        <rect x="0" y="596" width="1440" height="120" fill="url(#midPaint)" />
        <Chhatri x={90} y={560} base={p.mid} p={p} />
        <Chhatri x={1010} y={552} s={1.15} base={p.mid} p={p} />
        <Chhatri x={1210} y={568} s={0.85} base={p.mid} p={p} />
        <Chhatri x={1348} y={556} base={p.mid} p={p} />
        {[
          [330, 566, 150, 80],
          [640, 576, 120, 70],
          [820, 584, 110, 62],
        ].map(([x, y, w, h]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={h} fill={p.mid} />
            <rect x={x + w * 0.62} y={y} width={w * 0.38} height={h} fill={lit(p.mid, p.litAmt * 0.7)} />
            <rect x={x - 4} y={y - 6} width={w + 8} height="7" rx="2" fill={shade(p.mid, 0.35)} />
            <Windows x={x + 16} y={y + 24} cols={3} rows={1} gap={30} p={p} warm={0.7} />
          </g>
        ))}
      </g>

      {/* Dunes: each one a sunlit face and a shadow face meeting at the crest,
          which is what actually makes sand read as sand. */}
      <g>
        <path
          d="M0 662 C180 616 330 690 520 664 C700 640 860 700 1060 666 C1210 640 1350 664 1440 652 L1440 900 L0 900 Z"
          fill={mix(sand, "#000000", 0.18)}
        />
        <path
          d="M520 664 C700 640 860 700 1060 666 C1210 640 1350 664 1440 652 L1440 760 C1250 748 1050 742 860 754 C700 764 600 720 520 664 Z"
          fill={lit(sand, p.litAmt * 0.7)}
          opacity="0.45"
        />
      </g>

      <g fill={shade(p.near, 0.35)}>
        <Khejri x={170} y={676} fill={shade(p.near, 0.35)} />
        <Khejri x={1290} y={670} s={1.1} fill={shade(p.near, 0.35)} />
      </g>
      {/* The caravan sits on the near dune, below the collection cards —
          anywhere higher and the cards cover it. */}
      <g>
        <Camel x={1104} y={772} s={1.05} fill={shade(p.near, 0.3)} />
        <Camel x={1178} y={778} s={0.88} fill={shade(p.near, 0.36)} />
      </g>

      <path
        d="M0 748 C240 706 450 782 720 752 C950 726 1140 792 1440 748 L1440 900 L0 900 Z"
        fill={mix(sand, "#000000", 0.42)}
      />
      <path
        d="M0 748 C240 706 450 782 720 752 L720 800 C450 826 240 760 0 796 Z"
        fill={lit(sand, 0.1)}
        opacity="0.3"
      />

      <Baithak p={p} />

      <g fill={p.fg}>
        <g transform="translate(210 812)">
          <rect x="-120" y="-10" width="240" height="12" rx="4" />
          <rect x="-116" y="2" width="10" height="56" />
          <rect x="106" y="2" width="10" height="56" />
          <rect x="-60" y="2" width="8" height="46" />
          <rect x="52" y="2" width="8" height="46" />
          {Array.from({ length: 11 }, (_, i) => (
            <rect key={i} x={-112 + i * 21} y="-9" width="2" height="10" opacity="0.5" />
          ))}
        </g>
        <g transform="translate(1250 828)">
          <circle cx="0" cy="0" r="54" fill="none" stroke={p.fg} strokeWidth="10" />
          <circle cx="0" cy="0" r="9" />
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <rect key={a} x="-50" y="-2.5" width="100" height="5" transform={`rotate(${a})`} />
          ))}
        </g>
      </g>
    </>
  );
}

function Baithak({ p }) {
  return (
    <g transform="translate(86.4 150) scale(0.88)">
      <circle cx="720" cy="620" r="300" fill="url(#lampGlow)" />
      <path
        d="M560 780 L560 560 Q560 500 620 490 Q650 462 690 470 Q720 440 750 470 Q790 462 820 490 Q880 500 880 560 L880 780 Z"
        fill={p.lamp}
        opacity={p.lampAlpha * 0.5}
      />
      <path
        d="M578 780 L578 566 Q578 514 630 506 Q656 482 692 490 Q720 464 748 490 Q784 482 810 506 Q862 514 862 566 L862 780 Z"
        fill="url(#doorGlow)"
      />
      <g opacity="0.95" fill={p.fg}>
        {[
          [648, 772, 1.05],
          [722, 778, 1.15],
          [800, 772, 1.05],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <circle cx="0" cy="-46" r="13" />
            <path d="M-19 0 C-19 -30 -9 -36 0 -36 C9 -36 19 -30 19 0 Z" />
            <path d="M-27 0 h54 v6 h-54 Z" />
          </g>
        ))}
      </g>
      <path d="M508 500 L932 500 L900 470 L540 470 Z" fill={p.fg} />
      <rect x="500" y="494" width="440" height="12" rx="4" fill={p.fg} />
      {[600, 720, 840].map((x, i) => (
        <g key={x}>
          <rect x={x - 1} y="506" width="2" height="26" fill={p.fg} />
          <circle cx={x} cy="538" r="16" fill={p.lamp} opacity="0.18" filter="url(#soft)" />
          <circle cx={x} cy="538" r="6" fill={p.lamp} className="lamp-glow" />
        </g>
      ))}
    </g>
  );
}

function BlueCity({ p, tint }) {
  const rows = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let row = 0; row < 6; row++) {
    const baseY = 590 + row * 56;
    const depth = 1 - row / 6;
    const houses = [];
    for (let x = -50; x < 1490; x += 58 + Math.floor(rnd() * 30)) {
      const w = 44 + Math.floor(rnd() * 36);
      const h = 34 + Math.floor(rnd() * 40);
      houses.push({ x, w, h, y: baseY - h, tall: rnd() > 0.82 });
    }
    rows.push({ houses, depth, baseY });
  }

  return (
    <>
      {/* the rock, with a lit western face */}
      <g transform="translate(-190 -52)">
        <path d="M240 600 L300 470 L360 420 L470 386 L600 372 L720 384 L800 420 L860 470 L920 600 Z" fill="url(#farPaint)" />
        <path d="M600 372 L720 384 L800 420 L860 470 L920 600 L700 600 Z" fill={lit(p.far, p.litAmt * 0.55)} opacity="0.7" />

        {/* Mehrangarh */}
        <g>
          <rect x="360" y="330" width="440" height="72" fill={p.mid} />
          <rect x="600" y="330" width="200" height="72" fill={lit(p.mid, p.litAmt)} />
          <Courses x={360} y={330} w={440} h={72} step={12} />
          <rect x="392" y="286" width="96" height="48" fill={shade(p.mid, 0.12)} />
          <rect x="556" y="270" width="120" height="64" fill={p.mid} />
          <rect x="628" y="270" width="48" height="64" fill={lit(p.mid, p.litAmt)} />
          <rect x="712" y="296" width="80" height="40" fill={lit(p.mid, p.litAmt * 0.6)} />
          {[380, 470, 560, 650, 740].map((x) => (
            <g key={x}>
              <circle cx={x} cy="336" r="27" fill={p.mid} />
              <path d={`M${x} 309 a27 27 0 0 1 0 54 Z`} fill={lit(p.mid, p.litAmt)} />
            </g>
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={362 + i * 20} y="316" width="10" height="15" fill={shade(p.mid, 0.2)} />
          ))}
        </g>
        <Windows x={410} y={302} cols={4} rows={1} gap={26} p={p} />
        <Windows x={578} y={288} cols={4} rows={1} gap={26} p={p} />
      </g>

      {/* the blue houses, hazier and paler with distance */}
      {rows.map((row, ri) => (
        <g key={ri}>
          {row.houses.map((h, i) => {
            const base = mix(p.near, tint, p.tintAlpha * (0.55 + row.depth * 0.45));
            const hazed = mix(base, p.skyLow, (1 - row.depth) * 0.42);
            return (
              <g key={i}>
                <rect x={h.x} y={h.y} width={h.w} height={h.h + 70} fill={hazed} />
                <rect x={h.x + h.w * 0.66} y={h.y} width={h.w * 0.34} height={h.h + 70} fill={lit(hazed, p.litAmt * 0.8)} />
                <rect x={h.x - 3} y={h.y - 5} width={h.w + 6} height={6} fill={shade(hazed, 0.4)} />
                {h.tall && <rect x={h.x + h.w * 0.3} y={h.y - 22} width={14} height={18} fill={shade(hazed, 0.25)} />}
                {h.w > 54 && row.depth > 0.3 && (
                  <Windows x={h.x + 10} y={h.y + 18} cols={h.w > 68 ? 2 : 1} rows={1} gap={24} w={10} h={14} p={p} warm={row.depth} />
                )}
              </g>
            );
          })}
        </g>
      ))}
      <rect x="0" y="856" width="1440" height="44" fill={p.fg} />
    </>
  );
}

function GoldenFort({ p, tint }) {
  const bastions = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];
  const stone = mix(p.mid, tint, p.tintAlpha * 0.75);
  return (
    <>
      <g transform="translate(0 -96)">
        <path d="M180 620 L280 470 L1160 470 L1260 620 Z" fill="url(#farPaint)" />
        <g>
          <rect x="270" y="404" width="900" height="152" fill={stone} />
          <Courses x={270} y={404} w={900} h={152} step={14} opacity={0.16} />
          {Array.from({ length: 45 }, (_, i) => (
            <rect key={i} x={272 + i * 20} y="392" width="9" height="13" fill={shade(stone, 0.3)} />
          ))}
          {bastions.map((x) => {
            const towerLit = x > LIGHT_X - 500;
            return (
              <g key={x}>
                <path d={`M${x - 40} 574 L${x - 38} 372 Q${x} 336 ${x + 38} 372 L${x + 40} 574 Z`} fill={stone} />
                {/* the curve: lit on the right, falling to shadow on the left */}
                <path
                  d={`M${x} 342 Q${x + 38} 372 ${x + 40} 574 L${x} 574 Z`}
                  fill={lit(stone, p.litAmt * (towerLit ? 1 : 0.6))}
                />
                <path d={`M${x - 40} 574 L${x - 38} 372 Q${x - 22} 348 ${x - 14} 344 L${x - 14} 574 Z`} fill={shade(stone, 0.3)} />
                <Courses x={x - 40} y={372} w={80} h={200} step={16} opacity={0.1} />
                <rect x={x - 43} y="358" width="86" height="14" rx="3" fill={shade(stone, 0.42)} />
                {[-29, -11, 7, 25].map((d) => (
                  <rect key={d} x={x + d} y="344" width="11" height="15" fill={shade(stone, 0.16)} />
                ))}
              </g>
            );
          })}
        </g>
        {/* havelis */}
        <g>
          <rect x="180" y="560" width="1080" height="190" fill={mix(p.near, tint, p.tintAlpha * 0.45)} />
          {[220, 470, 720, 970].map((x) => (
            <g key={x}>
              <rect x={x} y={578} width={210} height={155} fill={mix(stone, "#000000", 0.18)} />
              <rect x={x + 132} y={578} width={78} height={155} fill={lit(mix(stone, "#000000", 0.18), p.litAmt * 0.7)} />
              <rect x={x - 6} y={570} width={222} height={10} rx="3" fill={shade(stone, 0.45)} />
              <Windows x={x + 16} y={606} cols={7} rows={3} gap={26} p={p} warm={0.85} />
            </g>
          ))}
        </g>
      </g>
      <Camel x={1300} y={792} s={1.15} fill={p.fg} />
      <Camel x={1362} y={798} s={0.95} fill={p.fg} />
      <Khejri x={120} y={786} s={1.2} fill={p.fg} />
      <Birds x={330} y={250} s={1.2} fill={mix(p.far, p.skyMid, 0.3)} />
      <path d="M0 802 C300 782 700 822 1080 798 C1260 786 1380 804 1440 798 L1440 900 L0 900 Z" fill={p.fg} />
    </>
  );
}

function LakePalace({ p, tint }) {
  const stone = mix(p.mid, tint, p.tintAlpha * 0.35);
  return (
    <>
      {/* Aravalli, two ranges so there is real distance */}
      <path d="M0 500 L180 402 L340 470 L520 384 L700 454 L900 396 L1120 466 L1300 414 L1440 486 L1440 620 L0 620 Z" fill="url(#farPaint)" />
      <path d="M0 546 L220 470 L420 528 L640 456 L880 520 L1120 462 L1340 524 L1440 494 L1440 640 L0 640 Z" fill={mix(p.far, p.mid, 0.5)} opacity="0.85" />

      {/* ghats */}
      <g>
        <rect x="0" y="558" width="1440" height="62" fill={p.mid} />
        {Array.from({ length: 26 }, (_, i) => (
          <g key={i}>
            <path d={`M${i * 56} 558 L${i * 56} 538 Q${i * 56 + 28} 512 ${i * 56 + 56} 538 L${i * 56 + 56} 558 Z`} fill={p.mid} />
            <path d={`M${i * 56 + 28} 519 Q${i * 56 + 56} 538 ${i * 56 + 56} 558 L${i * 56 + 28} 558 Z`} fill={lit(p.mid, p.litAmt * 0.5)} />
            <path d={`M${i * 56 + 8} 558 L${i * 56 + 8} 542 Q${i * 56 + 28} 524 ${i * 56 + 48} 542 L${i * 56 + 48} 558 Z`} fill="#000" opacity="0.35" />
          </g>
        ))}
        <rect x="0" y="612" width="1440" height="10" fill={shade(p.mid, 0.45)} />
      </g>

      {/* the island palace, on the right flank so the cards do not hide it */}
      <g transform="translate(500 -18)">
        <rect x="580" y="470" width="280" height="132" fill={stone} />
        <rect x="740" y="470" width="120" height="132" fill={lit(stone, p.litAmt)} />
        <Courses x={580} y={470} w={280} h={132} step={15} />
        <rect x="626" y="424" width="188" height="52" fill={mix(stone, "#000000", 0.12)} />
        <rect x="742" y="424" width="72" height="52" fill={lit(stone, p.litAmt * 0.8)} />
        <rect x="572" y="462" width="296" height="11" rx="3" fill={shade(stone, 0.42)} />
        <Chhatri x={640} y={424} s={0.55} base={stone} p={p} />
        <Chhatri x={720} y={410} s={0.72} base={stone} p={p} />
        <Chhatri x={800} y={424} s={0.55} base={stone} p={p} />
        <Windows x={600} y={500} cols={9} rows={3} gap={28} p={p} />
      </g>

      {/* water */}
      <rect x="0" y="600" width="1440" height="300" fill="url(#waterPaint)" />
      <g filter="url(#waterBlur)" opacity="0.34">
        <g transform="translate(500 1236) scale(1 -1)">
          <rect x="580" y="470" width="280" height="132" fill={stone} />
          <Windows x={600} y={500} cols={9} rows={3} gap={28} p={p} />
        </g>
      </g>
      {/* the sun/moon track on the water */}
      <rect x="1040" y="600" width="100" height="300" fill={p.disc} opacity="0.09" filter="url(#soft)" />
      {[628, 664, 706, 754, 812, 872].map((y, i) => (
        <rect key={y} x={140 + i * 40} y={y} width={420 - i * 34} height={2 + i * 0.4} rx="1" fill="#fff" opacity={0.06 + i * 0.008} />
      ))}

      {[
        [300, 762, 1],
        [1080, 806, 1.25],
      ].map(([x, y, s], i) => (
        <g key={i}>
          <g transform={`translate(${x} ${y}) scale(${s})`} fill={p.fg}>
            <path d="M-46 0 q46 24 92 0 q-46 11 -92 0 Z" />
            <rect x="-2" y="-36" width="4" height="36" />
            <path d="M2 -34 l30 28 h-30 Z" />
          </g>
          <g transform={`translate(${x} ${y + 6}) scale(${s} ${-s * 0.5})`} fill={p.fg} opacity="0.2" filter="url(#waterBlur)">
            <path d="M-46 0 q46 24 92 0 q-46 11 -92 0 Z" />
            <path d="M2 -34 l30 28 h-30 Z" />
          </g>
        </g>
      ))}
      <path d="M0 866 C320 854 760 882 1140 864 L1440 870 L1440 900 L0 900 Z" fill={p.fg} />
    </>
  );
}

function PinkCity({ p, tint }) {
  const storeys = [
    { y: 560, w: 900, x: 270, h: 300, rows: 6 },
    { y: 480, w: 780, x: 330, h: 90, rows: 2 },
    { y: 410, w: 640, x: 400, h: 90, rows: 2 },
    { y: 350, w: 480, x: 480, h: 90, rows: 2 },
    { y: 300, w: 320, x: 560, h: 90, rows: 2 },
  ];
  return (
    <>
      <g>
        <rect x="0" y="540" width="1440" height="92" fill="url(#farPaint)" />
        <Chhatri x={120} y={540} s={0.8} base={p.far} p={p} />
        <Chhatri x={1320} y={540} s={0.8} base={p.far} p={p} />
      </g>

      <g transform="translate(0 -84)">
        {storeys.map((s, i) => {
          const base = mix(p.mid, tint, p.tintAlpha * (0.9 - i * 0.05));
          return (
            <g key={i}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={base} />
              {/* the whole facade curves away to the left of the light */}
              <rect x={s.x + s.w * 0.58} y={s.y} width={s.w * 0.42} height={s.h} fill={lit(base, p.litAmt * 0.75)} />
              <rect x={s.x} y={s.y} width={s.w * 0.16} height={s.h} fill={shade(base, 0.22)} />
              <Courses x={s.x} y={s.y} w={s.w} h={s.h} step={30} opacity={0.09} />
              {/* cornice with its cast shadow */}
              <rect x={s.x - 10} y={s.y - 10} width={s.w + 20} height={11} rx="3" fill={lit(base, p.litAmt * 0.4)} />
              <rect x={s.x - 10} y={s.y + 1} width={s.w + 20} height={5} fill="#000" opacity="0.28" />
              <Windows
                x={s.x + 20}
                y={s.y + 32}
                cols={Math.floor((s.w - 34) / 30)}
                rows={s.rows}
                gap={30}
                w={15}
                h={20}
                p={p}
              />
            </g>
          );
        })}
        <Chhatri x={640} y={300} s={0.6} base={mix(p.mid, tint, p.tintAlpha * 0.6)} p={p} />
        <Chhatri x={800} y={300} s={0.6} base={mix(p.mid, tint, p.tintAlpha * 0.6)} p={p} />
      </g>

      <rect x="0" y="812" width="1440" height="88" fill={p.fg} />
      <rect x="0" y="812" width="1440" height="16" fill={lit(p.fg, 0.12)} opacity="0.6" />
      {[160, 400, 1040, 1290].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="694" width="4" height="122" fill={p.fg} />
          <circle cx={x} cy="690" r="20" fill={p.lamp} opacity="0.16" filter="url(#soft)" />
          <circle cx={x} cy="690" r="7" fill={p.lamp} className="lamp-glow" />
          <ellipse cx={x} cy="838" rx="26" ry="5" fill={p.lamp} opacity="0.1" />
        </g>
      ))}
      <Birds x={1150} y={230} s={1.1} fill={mix(p.far, p.skyMid, 0.35)} />
    </>
  );
}

function SaltLake({ p, tint }) {
  const crust = mix(p.water, tint, p.tintAlpha * 0.5);
  return (
    <>
      {/* the far shore is barely there — that is what Sambhar looks like */}
      <rect x="0" y="592" width="1440" height="14" fill={mix(p.far, p.skyLow, 0.55)} opacity="0.8" />
      <rect x="0" y="586" width="1440" height="26" fill={p.skyLow} opacity="0.35" filter="url(#soft)" />

      <rect x="0" y="606" width="1440" height="294" fill="url(#saltPaint)" />

      {/* bunds, converging slightly so the pans read as receding */}
      {[634, 668, 710, 764, 832, 900].map((y, i) => (
        <rect key={y} x="0" y={y} width="1440" height={1.5 + i * 0.9} fill={shade(crust, 0.5)} opacity="0.4" />
      ))}
      {[
        [150, 40],
        [470, 18],
        [760, -6],
        [1050, -30],
        [1340, -54],
      ].map(([x, skew], i) => (
        <path key={i} d={`M${x} 606 L${x + skew} 900 L${x + skew + 4} 900 L${x + 4} 606 Z`} fill={shade(crust, 0.5)} opacity="0.28" />
      ))}

      {/* wet sheen where the pans still hold water */}
      <rect x="0" y="606" width="1440" height="120" fill={p.disc} opacity="0.06" filter="url(#soft)" />

      {[
        [250, 668, 1],
        [560, 694, 1.3],
        [900, 676, 1.1],
        [1230, 710, 1.45],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-48 0 L0 -42 L48 0 Z" fill={mix(crust, "#ffffff", 0.22)} />
          <path d="M0 -42 L48 0 L0 0 Z" fill={mix(crust, "#ffffff", 0.42)} />
          <ellipse cx="0" cy="2" rx="48" ry="6" fill="#000" opacity="0.18" />
        </g>
      ))}

      {[
        [380, 800, 1],
        [430, 816, 0.85],
        [1020, 822, 1.15],
        [1080, 806, 0.9],
        [700, 850, 1.3],
      ].map(([x, y, s], i) => (
        <g key={i}>
          <g transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M0 0 l3 -22 q1 -8 8 -10 q7 -2 10 4 q-6 -1 -8 3 q-2 4 2 6 l-6 4 q-4 -3 -6 1 l-1 14 Z" fill={p.fg} />
            <path d="M-4 -6 q8 -6 16 0 q-8 4 -16 0 Z" fill={mix(p.fg, tint, 0.4)} />
            <rect x="-1" y="0" width="2" height="16" fill={p.fg} />
            <rect x="4" y="0" width="2" height="16" fill={p.fg} />
          </g>
          <g transform={`translate(${x} ${y + 32}) scale(${s} ${-s * 0.6})`} opacity="0.22" filter="url(#waterBlur)">
            <path d="M0 0 l3 -22 q1 -8 8 -10 q7 -2 10 4 q-6 -1 -8 3 q-2 4 2 6 l-6 4 q-4 -3 -6 1 l-1 14 Z" fill={p.fg} />
          </g>
        </g>
      ))}

      <g opacity="0.45">
        <rect x="0" y="760" width="1440" height="3" fill={p.fg} />
        {Array.from({ length: 40 }, (_, i) => (
          <rect key={i} x={i * 36} y="754" width="6" height="15" fill={p.fg} />
        ))}
      </g>
      <Birds x={220} y={220} s={1.3} fill={mix(p.far, p.skyMid, 0.35)} />
    </>
  );
}

const SCENES = {
  "thar-dhora": TharDunes,
  "neelo-shehar": BlueCity,
  "sonar-quila": GoldenFort,
  pichola: LakePalace,
  "hawa-mahal": PinkCity,
  sambhar: SaltLake,
};

export default function SceneBackdrop({ scene = "night", theme = "thar-dhora" }) {
  const p = PALETTES[scene] || PALETTES.night;
  const t = themeBySlug(theme);
  const Scene = SCENES[t.slug] || TharDunes;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-scene={t.slug}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyTop} />
            <stop offset="52%" stopColor={p.skyMid} />
            <stop offset="100%" stopColor={p.skyLow} />
          </linearGradient>
          {/* Distant layers lose contrast toward their base: that is what makes
              depth read, more than any amount of detail does. */}
          <linearGradient id="farPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.far} />
            <stop offset="100%" stopColor={mix(p.far, p.skyLow, 0.38)} />
          </linearGradient>
          <linearGradient id="midPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mix(p.mid, p.skyLow, 0.22)} />
            <stop offset="100%" stopColor={shade(p.mid, 0.18)} />
          </linearGradient>
          <linearGradient id="waterPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mix(p.water, p.skyLow, 0.42)} />
            <stop offset="45%" stopColor={p.water} />
            <stop offset="100%" stopColor={shade(p.water, 0.4)} />
          </linearGradient>
          <linearGradient id="saltPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mix(p.water, "#ffffff", 0.3)} />
            <stop offset="40%" stopColor={p.water} />
            <stop offset="100%" stopColor={shade(p.water, 0.34)} />
          </linearGradient>
          <linearGradient id="doorGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd98a" stopOpacity={p.lampAlpha * 0.55} />
            <stop offset="100%" stopColor="#f2a03c" stopOpacity={p.lampAlpha * 0.18} />
          </linearGradient>
          <radialGradient id="discGlow">
            <stop offset="0%" stopColor={p.discGlow} stopOpacity="0.8" />
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
          <radialGradient id="titleScrim" cx="50%" cy="42%" r="46%">
            <stop offset="0%" stopColor="#0d0812" stopOpacity="0.62" />
            <stop offset="70%" stopColor="#0d0812" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0d0812" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="baseFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#150f18" stopOpacity="0" />
            <stop offset="100%" stopColor="#150f18" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="horizonHaze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyLow} stopOpacity="0" />
            <stop offset="60%" stopColor={p.skyLow} stopOpacity="0.55" />
            <stop offset="100%" stopColor={p.skyLow} stopOpacity="0" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="waterBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <filter id="cloudBlur" x="-30%" y="-60%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)" />

        {p.stars > 0 &&
          STARS.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 4 === 0 ? 1.9 : 1.1}
              fill="#f6e8d0"
              opacity={p.stars}
              style={{ animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.31}s infinite` }}
            />
          ))}

        {p.clouds > 0.15 &&
          CLOUDS.map(([cx, cy, rx, ry], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill={mix(p.skyMid, "#ffffff", 0.35)}
              opacity={p.clouds * 0.22}
              filter="url(#cloudBlur)"
            />
          ))}

        <circle cx={LIGHT_X} cy={p.discY} r={p.discR * 5.5} fill="url(#discGlow)" />
        <circle cx={LIGHT_X} cy={p.discY} r={p.discR} fill={p.disc} opacity="0.94" />

        <Scene p={p} tint={t.tint} />

        {/* A thin band of haze on the horizon. Kept weak on purpose: at any
            real strength it flattens the whole picture instead of deepening it. */}
        <rect y="520" width="1440" height="120" fill="url(#horizonHaze)" opacity="0.2" />
        <rect width="1440" height="900" fill="url(#vignette)" />
        <rect width="1440" height="900" fill="url(#titleScrim)" />
        <rect y="700" width="1440" height="200" fill="url(#baseFade)" />
      </svg>

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
