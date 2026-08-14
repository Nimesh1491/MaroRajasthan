// The illustrated backdrop, drawn rather than photographed.
//
// Two things decide what you see, and they are independent:
//   - `scene` is the time of day, from the hour in India (lib/ist.js). It sets
//     the sky, the sun or moon, and how dark the ground reads.
//   - `theme` is the place, chosen by the listener (data/themes.js). It decides
//     the architecture and the tint.
//
// Neither has anything to do with what is playing.

import { themeBySlug } from "@/data/themes";

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
    far: "#241a3c",
    mid: "#1d1430",
    near: "#130d1a",
    fg: "#0b0810",
    water: "#1b1836",
    lamp: "#e8ab2e",
    lampAlpha: 0.5,
    tintAlpha: 0.3,
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
    far: "#5a3648",
    mid: "#7a4a44",
    near: "#3a2228",
    fg: "#1a1016",
    water: "#8a5a52",
    lamp: "#e8ab2e",
    lampAlpha: 0.3,
    tintAlpha: 0.5,
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
    far: "#8d7a63",
    mid: "#b09572",
    near: "#6a5540",
    fg: "#33281c",
    water: "#7fa8c4",
    lamp: "#e8ab2e",
    lampAlpha: 0.18,
    tintAlpha: 0.78,
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
    far: "#4a2233",
    mid: "#68313a",
    near: "#2a1218",
    fg: "#150a10",
    water: "#6d3340",
    lamp: "#e8ab2e",
    lampAlpha: 0.42,
    tintAlpha: 0.45,
  },
};

const STARS = [
  [120, 90], [260, 150], [380, 70], [520, 130], [640, 60], [760, 110],
  [900, 80], [1040, 145], [1180, 65], [1320, 120], [180, 210], [430, 235],
  [700, 200], [980, 230], [1250, 205], [60, 160], [1400, 175], [340, 120],
  [860, 175], [1120, 100],
];

/* ------------------------------------------------------------------ atoms */

function Chhatri({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M-40 0 h80 v-8 h-80 Z" />
      <path d="M-34 -8 q34 -46 68 0 Z" />
      <rect x="-2" y="-62" width="4" height="14" />
      <circle cx="0" cy="-64" r="5" />
      <rect x="-34" y="0" width="7" height="42" />
      <rect x="-12" y="0" width="7" height="42" />
      <rect x="6" y="0" width="7" height="42" />
      <rect x="27" y="0" width="7" height="42" />
    </g>
  );
}

function Camel({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M-24 0 v-14 q0 -10 8 -12 q4 -12 12 -12 q8 0 11 10 q7 -2 9 6 l3 22 h-6 l-3 -16 l-22 2 l-2 14 Z" />
      <path d="M-20 0 l-2 14 h4 l3 -14 Z" />
      <path d="M14 0 l2 14 h4 l-2 -14 Z" />
      <path d="M13 -28 q9 -6 14 2 l-3 6 Z" />
    </g>
  );
}

function Khejri({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x="-3" y="-34" width="6" height="34" />
      <path d="M-30 -34 q30 -26 60 0 q-30 -12 -60 0 Z" />
      <path d="M-22 -44 q22 -20 44 0 q-22 -9 -44 0 Z" />
    </g>
  );
}

/** A grid of jharokha openings — the unit the pink city is built from. */
function Jharokhas({ x, y, cols, rows, gap = 26, fill, opacity = 1 }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <g key={`${r}-${c}`} transform={`translate(${c * gap} ${r * gap})`}>
          <path d="M0 14 L0 6 Q0 -4 7 -4 Q14 -4 14 6 L14 14 Z" />
        </g>
      );
    }
  }
  return (
    <g transform={`translate(${x} ${y})`} fill={fill} opacity={opacity}>
      {cells}
    </g>
  );
}

function Flamingo({ x, y, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M0 0 l3 -22 q1 -8 8 -10 q7 -2 10 4 q-6 -1 -8 3 q-2 4 2 6 l-6 4 q-4 -3 -6 1 l-1 14 Z" />
      <rect x="-1" y="0" width="2" height="16" />
      <rect x="4" y="0" width="2" height="16" />
      <path d="M-4 -6 q8 -6 16 0 q-8 4 -16 0 Z" />
    </g>
  );
}

/* ----------------------------------------------------------------- scenes */

function TharDunes({ p, tint }) {
  return (
    <>
      <g fill={p.far}>
        <path d="M0 560 L60 548 L120 520 L150 470 L250 452 L300 470 L360 462 L420 486 L520 478 L560 500 L640 508 L700 530 L760 545 L820 556 L900 560 L1440 566 L1440 620 L0 620 Z" />
        <path d="M170 470 h150 v-34 h-12 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-22 v-14 h-14 v14 h-12 Z" />
      </g>
      <g fill={p.mid}>
        <rect x="0" y="596" width="1440" height="120" />
        <Chhatri x={90} y={560} fill={p.mid} />
        <Chhatri x={1010} y={552} s={1.15} fill={p.mid} />
        <Chhatri x={1210} y={568} s={0.85} fill={p.mid} />
        <Chhatri x={1348} y={556} fill={p.mid} />
        <rect x="330" y="566" width="150" height="80" />
        <rect x="640" y="576" width="120" height="70" />
        <rect x="820" y="584" width="110" height="62" />
      </g>
      <path
        d="M0 660 C220 618 380 690 600 662 C820 634 980 700 1200 664 C1320 644 1400 660 1440 654 L1440 900 L0 900 Z"
        fill={tint}
        opacity={p.tintAlpha * 0.55}
      />
      <path
        d="M0 660 C220 618 380 690 600 662 C820 634 980 700 1200 664 C1320 644 1400 660 1440 654 L1440 900 L0 900 Z"
        fill={p.near}
        opacity="0.55"
      />
      <g fill={p.near}>
        <Khejri x={170} y={668} fill={p.near} />
        <Khejri x={1075} y={672} s={0.85} fill={p.near} />
        <Khejri x={1290} y={664} s={1.1} fill={p.near} />
        <Camel x={990} y={676} s={0.9} fill={p.near} />
        <Camel x={1042} y={680} s={0.78} fill={p.near} />
      </g>
      <path
        d="M0 744 C260 706 460 776 720 748 C960 722 1140 786 1440 744 L1440 900 L0 900 Z"
        fill={p.near}
      />
      <Baithak p={p} />
      <g fill={p.fg}>
        <g transform="translate(210 810)">
          <rect x="-120" y="-10" width="240" height="12" rx="4" />
          <rect x="-116" y="2" width="10" height="56" />
          <rect x="106" y="2" width="10" height="56" />
          <rect x="-60" y="2" width="8" height="46" />
          <rect x="52" y="2" width="8" height="46" />
        </g>
        <g transform="translate(1250 826)">
          <circle cx="0" cy="0" r="54" fill="none" stroke={p.fg} strokeWidth="10" />
          <circle cx="0" cy="0" r="9" />
          {[0, 45, 90, 135].map((a) => (
            <rect key={a} x="-50" y="-3" width="100" height="6" transform={`rotate(${a})`} />
          ))}
        </g>
      </g>
    </>
  );
}

/** The lit doorway the Thar scene is built around. */
function Baithak({ p }) {
  return (
    <g transform="translate(86.4 150) scale(0.88)">
      <circle cx="720" cy="620" r="300" fill="url(#lampGlow)" />
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
      <g opacity="0.92" fill={p.fg}>
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
  );
}

function BlueCity({ p, tint }) {
  // A dense field of flat-roofed cubes, which is what Jodhpur looks like from
  // the fort: not streets, just rooftops.
  const houses = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let row = 0; row < 5; row++) {
    const baseY = 620 + row * 58;
    for (let x = -40; x < 1480; x += 62 + Math.floor(rnd() * 26)) {
      const w = 46 + Math.floor(rnd() * 34);
      const h = 40 + Math.floor(rnd() * 34);
      houses.push({ x, y: baseY - h, w, h, row });
    }
  }
  return (
    <>
      {/* The fort sits on the left flank rather than dead centre: the middle of
          the frame is where the wordmark and the collection cards land, and a
          silhouette put there is simply never seen. */}
      <g transform="translate(-190 -52)">
        {/* the rock it stands on */}
        <path
          d="M240 600 L300 470 L360 420 L470 386 L600 372 L720 384 L800 420 L860 470 L920 600 Z"
          fill={p.far}
        />
        {/* Mehrangarh: a long wall with bastions */}
        <g fill={p.mid}>
          <rect x="360" y="330" width="440" height="70" />
          <rect x="392" y="286" width="96" height="48" />
          <rect x="556" y="270" width="120" height="64" />
          <rect x="712" y="296" width="80" height="40" />
          {[380, 470, 560, 650, 740].map((x) => (
            <circle key={x} cx={x} cy="336" r="26" />
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={362 + i * 20} y="318" width="10" height="14" />
          ))}
        </g>
        <Jharokhas x={410} y={300} cols={4} rows={1} gap={26} fill={p.lamp} opacity={p.lampAlpha} />
        <Jharokhas x={578} y={286} cols={4} rows={1} gap={26} fill={p.lamp} opacity={p.lampAlpha} />
      </g>

      {/* the blue houses */}
      {houses.map((h, i) => (
        <g key={i}>
          <rect x={h.x} y={h.y} width={h.w} height={h.h + 60} fill={p.near} />
          <rect
            x={h.x}
            y={h.y}
            width={h.w}
            height={h.h + 60}
            fill={tint}
            opacity={p.tintAlpha * (0.9 - h.row * 0.1)}
          />
          <rect x={h.x - 3} y={h.y - 5} width={h.w + 6} height={6} fill={p.fg} opacity="0.55" />
          {h.w > 58 && (
            <rect
              x={h.x + 12}
              y={h.y + 16}
              width={12}
              height={16}
              fill={p.lamp}
              opacity={p.lampAlpha * 0.9}
            />
          )}
        </g>
      ))}
      <rect x="0" y="860" width="1440" height="40" fill={p.fg} />
    </>
  );
}

function GoldenFort({ p, tint }) {
  const bastions = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];
  return (
    <>
      {/* Raised so the bastion line clears the collection cards — the round
          towers are the whole point of Jaisalmer and need to be visible. */}
      <g transform="translate(0 -96)">
      <path d="M180 620 L280 470 L1160 470 L1260 620 Z" fill={p.far} />
      {/* the fort wall, all round bastions — Jaisalmer's signature */}
      <g>
        {/* curtain wall */}
        <rect x="270" y="404" width="900" height="150" fill={p.mid} />
        <rect x="270" y="404" width="900" height="150" fill={tint} opacity={p.tintAlpha * 0.62} />
        {Array.from({ length: 45 }, (_, i) => (
          <rect key={i} x={272 + i * 20} y="392" width="9" height="13" fill={p.mid} />
        ))}
        {/* Bastions stand proud of the wall — taller, wider and a shade darker,
            otherwise they merge into it and Jaisalmer stops being Jaisalmer. */}
        {bastions.map((x) => (
          <g key={x}>
            <path
              d={`M${x - 40} 574 L${x - 38} 372 Q${x} 336 ${x + 38} 372 L${x + 40} 574 Z`}
              fill={p.mid}
            />
            <path
              d={`M${x - 40} 574 L${x - 38} 372 Q${x} 336 ${x + 38} 372 L${x + 40} 574 Z`}
              fill={tint}
              opacity={p.tintAlpha * 0.95}
            />
            <path
              d={`M${x - 40} 574 L${x - 38} 372 Q${x} 336 ${x} 350 L${x} 574 Z`}
              fill="#000"
              opacity="0.12"
            />
            <rect x={x - 42} y="360" width="84" height="12" rx="3" fill={p.fg} opacity="0.35" />
            {[-28, -10, 8, 26].map((d) => (
              <rect key={d} x={x + d} y="348" width="10" height="14" fill={p.mid} />
            ))}
          </g>
        ))}
      </g>
      {/* haveli fronts below, with jharokha rows lit from inside */}
      <g>
        <rect x="180" y="560" width="1080" height="180" fill={p.near} />
        <rect x="180" y="560" width="1080" height="180" fill={tint} opacity={p.tintAlpha * 0.5} />
        {[220, 470, 720, 970].map((x) => (
          <g key={x}>
            <rect x={x} y={578} width={210} height={150} fill={p.mid} opacity="0.5" />
            <Jharokhas x={x + 16} y={606} cols={7} rows={3} gap={26} fill={p.lamp} opacity={p.lampAlpha * 0.85} />
          </g>
        ))}
      </g>
      </g>
      <Camel x={1300} y={790} s={1.15} fill={p.fg} />
      <Camel x={1362} y={796} s={0.95} fill={p.fg} />
      <Khejri x={120} y={782} s={1.2} fill={p.fg} />
      <path d="M0 800 C300 780 700 820 1080 796 C1260 784 1380 802 1440 796 L1440 900 L0 900 Z" fill={p.fg} />
    </>
  );
}

function LakePalace({ p, tint }) {
  return (
    <>
      {/* the Aravalli behind */}
      <path d="M0 520 L180 420 L340 486 L520 400 L700 470 L900 410 L1120 480 L1300 430 L1440 500 L1440 620 L0 620 Z" fill={p.far} />
      {/* far ghats */}
      <g fill={p.mid}>
        <rect x="0" y="560" width="1440" height="60" />
        {Array.from({ length: 26 }, (_, i) => (
          <path key={i} d={`M${i * 56} 560 L${i * 56} 540 Q${i * 56 + 28} 516 ${i * 56 + 56} 540 L${i * 56 + 56} 560 Z`} />
        ))}
      </g>
      {/* The island palace, kept to the right flank. Centred it was hidden
          behind the collection cards entirely. */}
      <g transform="translate(500 -18)">
        <rect x="580" y="470" width="280" height="130" fill={p.mid} />
        <rect x="580" y="470" width="280" height="130" fill={tint} opacity={p.tintAlpha * 0.5} />
        <rect x="626" y="424" width="188" height="52" fill={p.mid} />
        <Chhatri x={640} y={424} s={0.55} fill={p.mid} />
        <Chhatri x={720} y={410} s={0.7} fill={p.mid} />
        <Chhatri x={800} y={424} s={0.55} fill={p.mid} />
        <Jharokhas x={600} y={500} cols={9} rows={3} gap={28} fill={p.lamp} opacity={p.lampAlpha} />
      </g>
      {/* water */}
      <rect x="0" y="600" width="1440" height="300" fill={p.water} />
      <rect x="0" y="600" width="1440" height="300" fill={tint} opacity={p.tintAlpha * 0.35} />
      {/* reflection of the palace, softened */}
      <g opacity="0.28" transform="translate(500 1236) scale(1 -1)">
        <rect x="580" y="470" width="280" height="130" fill={p.mid} />
        <Jharokhas x={600} y={500} cols={9} rows={3} gap={28} fill={p.lamp} opacity={p.lampAlpha} />
      </g>
      {/* ripples */}
      {[640, 690, 740, 790, 840].map((y, i) => (
        <rect key={y} x={200 + i * 60} y={y} width={340 - i * 30} height="3" rx="1.5" fill="#fff" opacity="0.07" />
      ))}
      {/* boats */}
      {[
        [300, 760, 1],
        [1080, 800, 1.25],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill={p.fg}>
          <path d="M-46 0 q46 22 92 0 q-46 10 -92 0 Z" />
          <rect x="-2" y="-34" width="4" height="34" />
          <path d="M2 -32 l30 26 h-30 Z" />
        </g>
      ))}
      <path d="M0 862 C320 850 760 878 1140 860 L1440 866 L1440 900 L0 900 Z" fill={p.fg} />
    </>
  );
}

function PinkCity({ p, tint }) {
  return (
    <>
      <g fill={p.far}>
        <rect x="0" y="540" width="1440" height="90" />
        <Chhatri x={120} y={540} s={0.8} fill={p.far} />
        <Chhatri x={1320} y={540} s={0.8} fill={p.far} />
      </g>
      {/* The facade, raised so its upper storeys clear the collection cards. */}
      <g transform="translate(0 -84)">
        {[
          { y: 560, w: 900, x: 270 },
          { y: 480, w: 780, x: 330 },
          { y: 410, w: 640, x: 400 },
          { y: 350, w: 480, x: 480 },
          { y: 300, w: 320, x: 560 },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={s.y} width={s.w} height={i === 0 ? 300 : 90} fill={p.mid} />
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={i === 0 ? 300 : 90}
              fill={tint}
              opacity={p.tintAlpha * (0.85 - i * 0.06)}
            />
            <rect x={s.x - 8} y={s.y - 8} width={s.w + 16} height={10} rx="3" fill={p.fg} opacity="0.35" />
            <Jharokhas
              x={s.x + 18}
              y={s.y + 30}
              cols={Math.floor((s.w - 30) / 30)}
              rows={i === 0 ? 6 : 2}
              gap={30}
              fill={p.lamp}
              opacity={p.lampAlpha * 0.95}
            />
          </g>
        ))}
        <Chhatri x={640} y={300} s={0.6} fill={p.mid} />
        <Chhatri x={800} y={300} s={0.6} fill={p.mid} />
      </g>
      {/* street lamps and the road */}
      <rect x="0" y="820" width="1440" height="80" fill={p.fg} />
      {[160, 400, 1040, 1290].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="700" width="4" height="122" fill={p.fg} />
          <circle cx={x} cy="694" r="9" fill={p.lamp} className="lamp-glow" opacity={p.lampAlpha + 0.2} />
        </g>
      ))}
    </>
  );
}

function SaltLake({ p, tint }) {
  return (
    <>
      {/* almost nothing on the horizon — that is the point of Sambhar */}
      <rect x="0" y="596" width="1440" height="18" fill={p.far} opacity="0.7" />
      {/* the pans */}
      <rect x="0" y="610" width="1440" height="290" fill={p.water} />
      <rect x="0" y="610" width="1440" height="290" fill={tint} opacity={p.tintAlpha * 0.45} />
      {/* dividing bunds, drawn in perspective */}
      {[640, 676, 720, 776, 846, 930].map((y, i) => (
        <rect key={y} x="0" y={y} width="1440" height={2 + i} fill={p.fg} opacity="0.25" />
      ))}
      {[180, 470, 760, 1050, 1340].map((x) => (
        <rect key={x} x={x} y="610" width="3" height="290" fill={p.fg} opacity="0.18" />
      ))}
      {/* salt heaps */}
      {[
        [250, 660, 1],
        [560, 686, 1.3],
        [900, 668, 1.1],
        [1230, 700, 1.45],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-46 0 L0 -40 L46 0 Z" fill={p.near} />
          <path d="M-46 0 L0 -40 L46 0 Z" fill="#fff" opacity={p.tintAlpha * 0.55} />
        </g>
      ))}
      {/* flamingos, standing and reflected */}
      {[
        [380, 790, 1],
        [430, 806, 0.85],
        [1020, 812, 1.15],
        [1080, 796, 0.9],
        [700, 840, 1.3],
      ].map(([x, y, s], i) => (
        <g key={i}>
          <Flamingo x={x} y={y} s={s} fill={p.fg} />
          <g opacity="0.18" transform={`translate(0 ${2 * (y + 16)}) scale(1 -1)`}>
            <Flamingo x={x} y={y} s={s} fill={p.fg} />
          </g>
        </g>
      ))}
      {/* the narrow-gauge line that still crosses the lake */}
      <g opacity="0.5">
        <rect x="0" y="756" width="1440" height="3" fill={p.fg} />
        {Array.from({ length: 40 }, (_, i) => (
          <rect key={i} x={i * 36} y="750" width="6" height="15" fill={p.fg} />
        ))}
      </g>
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

        <rect width="1440" height="900" fill="url(#sky)" />

        {p.stars > 0 &&
          STARS.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 4 === 0 ? 1.9 : 1.2}
              fill="#f6e8d0"
              opacity={p.stars}
              style={{ animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.31}s infinite` }}
            />
          ))}

        <circle cx="1090" cy={p.discY} r={p.discR * 5} fill="url(#discGlow)" />
        <circle cx="1090" cy={p.discY} r={p.discR} fill={p.disc} opacity="0.92" />

        <Scene p={p} tint={t.tint} />

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
