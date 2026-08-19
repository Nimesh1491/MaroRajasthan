// काका — the man at the door.
//
// A Marwari villager as the station's greeter, dressed the way a shop sign in
// Jodhpur would paint him: the safa wound in four broad folds over a leheriya
// stripe and printed bandhani, its loose end hanging behind the shoulder; the
// moustache, which is the whole point of the drawing; an angarkha wrapped and
// tied to one side over a marigold patka; a kada at each wrist and a murki in
// one ear; the jhola on its strap, curl-toed mojari with their red pom-poms, and
// a lathi he leans on rather than uses.
//
// Drawn here rather than dropped in as a picture: it is one shape per garment,
// so it stays crisp at 110px on a phone and at 400px on a tablet, it costs no
// request, and it carries no licence. The palette is the station's own, which is
// why he matches the wordmark he stands under.
//
// Two things to know before changing it. The moustache is outlined in cream
// rather than ink, because it hangs out past his face onto an ink page and an ink
// line there would leave him clean-shaven. And the figure is decoration: it is
// hidden from screen readers, so nothing about the station may be said only here.
//
// The drawing is 250×330 and stands on the bottom edge, so a height is all a
// caller needs to give it.

const SKIN = "#e8b98f";
const WOOD = "#8a5a34";
const LINEN = "#fdf6e8";
const MOUTH = "#8a1029";

export default function Kaka({ className = "" }) {
  return (
    <svg
      viewBox="0 0 250 330"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <g
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* the lathi */}
        <rect x="34" y="44" width="8" height="278" rx="4" fill={WOOD} />
        <path d="M34 116h8M34 186h8M34 256h8" strokeWidth="2" />

        {/* dhoti, with a marigold border at the hem */}
        <path
          d="M96 232c-8 22-10 42-7 62 1 6 3 9 8 9h18c5 0 7-3 7-9 1-20 0-40-3-62z"
          fill="var(--color-cream)"
        />
        <path
          d="M138 232c-4 22-4 42-1 62 1 6 3 9 8 9h18c5 0 7-3 8-9 2-20-1-40-9-62z"
          fill="var(--color-cream)"
        />
        <path
          d="M89 292h34M144 292h35"
          stroke="var(--color-marigold)"
          strokeWidth="4"
        />
        <path
          d="M108 252c-2 12-3 26-2 38M152 252c1 12 1 26 0 38"
          fill="none"
          strokeWidth="2"
        />

        {/* ankles */}
        <path d="M106 303h16v10h-16zM148 303h16v10h-16z" fill={SKIN} />

        {/* mojari, toes curled up */}
        <path
          d="M124 312c-4-5-18-6-24-1-8 7-22 11-34 9 6 8 20 11 34 9 13-2 24-8 24-17z"
          fill={WOOD}
        />
        <path
          d="M166 312c-4-5-18-6-24-1-5 4-4 12 3 14 13 3 30 1 40-9-11 2-19-1-19-4z"
          fill={WOOD}
        />
        <circle cx="62" cy="319" r="5" fill="var(--color-lac)" strokeWidth="2" />
        <circle cx="189" cy="309" r="5" fill="var(--color-lac)" strokeWidth="2" />

        {/* the angarkha, wrapped and tied to one side */}
        <path
          d="M118 168c-20 1-36 8-41 21-5 14-7 30-5 47h94c2-17 0-33-5-47-5-13-23-21-43-21z"
          fill="var(--color-cream)"
        />
        <path
          d="M100 172c-6 16-4 30 6 42 8 9 22 12 38 9-3-18-10-34-20-47-6-8-14-11-24-4z"
          fill={LINEN}
        />
        <path
          d="M144 223c-14 3-28 0-38-9-10-12-12-26-6-42"
          fill="none"
          stroke="var(--color-marigold)"
          strokeWidth="4.5"
        />
        <path
          d="M144 223c-14 3-28 0-38-9-10-12-12-26-6-42"
          fill="none"
          strokeWidth="2.2"
        />
        <path d="M146 196l10-4M148 206l10-3" stroke={WOOD} strokeWidth="2.2" />

        {/* patka: the sash at the waist, with its end hanging */}
        <path
          d="M74 214h88c1 6 1 12 1 18H73c0-6 0-12 1-18z"
          fill="var(--color-marigold)"
        />
        <path
          d="M148 232c6 12 8 24 6 36l-8-5-7 6c-3-13-1-25 3-37z"
          fill="var(--color-marigold)"
        />
        <path d="M84 218h68" stroke="var(--color-lac)" strokeWidth="2.2" />

        {/* arms: one up to the lathi, one hanging */}
        <path
          d="M82 190c-12 5-24 13-31 21"
          fill="none"
          strokeWidth="12"
          stroke="var(--color-cream)"
        />
        <path d="M82 190c-12 5-24 13-31 21" fill="none" />
        <path
          d="M156 190c9 11 14 28 13 48"
          fill="none"
          strokeWidth="12"
          stroke="var(--color-cream)"
        />
        <path d="M156 190c9 11 14 28 13 48" fill="none" />

        {/* the hand that holds it, and a kada at each wrist */}
        <path
          d="M54 204c-9-1-18 3-20 9-2 7 4 14 13 15 7 1 12-2 14-7l1-8c0-5-2-8-8-9z"
          fill={SKIN}
        />
        <path d="M35 211h13M35 218h14M36 225h12" fill="none" strokeWidth="2" />
        <path d="M63 198l-7 15" stroke="var(--color-marigold)" strokeWidth="5" />
        <path d="M63 198l-7 15" strokeWidth="2" />
        <ellipse cx="169" cy="242" rx="9" ry="10" fill={SKIN} />
        <path d="M163 229l11 4" stroke="var(--color-marigold)" strokeWidth="4" />
        <path d="M163 229l11 4" strokeWidth="2" />

        {/* jhola */}
        <path d="M154 182L100 234" fill="none" stroke={WOOD} strokeWidth="8" />
        <path d="M154 182L100 234" fill="none" strokeWidth="2" />
        <path
          d="M82 228c-7 0-12 5-12 12v18c0 8 5 14 12 14h18c7 0 12-6 12-14v-18c0-7-5-12-12-12z"
          fill={WOOD}
        />
        <path d="M70 242h42" fill="none" strokeWidth="2" />
        <path d="M84 254h14" stroke="var(--color-marigold)" strokeWidth="2.4" />

        {/* face, ears, and a murki in one of them */}
        <ellipse cx="118" cy="128" rx="34" ry="36" fill={SKIN} />
        <ellipse cx="84" cy="132" rx="6" ry="8" fill={SKIN} />
        <ellipse cx="152" cy="132" rx="6" ry="8" fill={SKIN} />
        <circle
          cx="153"
          cy="141"
          r="3.4"
          fill="none"
          stroke="var(--color-marigold)"
          strokeWidth="2.2"
        />

        {/* the cord and its pendant */}
        <path d="M104 166c6 8 22 8 28 0" fill="none" strokeWidth="2.4" />
        <circle cx="118" cy="173" r="4" fill="var(--color-marigold)" strokeWidth="2" />

        {/* eyes and brows */}
        <circle cx="103" cy="122" r="11" fill={LINEN} />
        <circle cx="135" cy="122" r="11" fill={LINEN} />
        <circle cx="105" cy="123" r="5.4" fill="var(--color-ink)" stroke="none" />
        <circle cx="137" cy="123" r="5.4" fill="var(--color-ink)" stroke="none" />
        <circle cx="107" cy="120" r="1.7" fill={LINEN} stroke="none" />
        <circle cx="139" cy="120" r="1.7" fill={LINEN} stroke="none" />
        <path
          d="M93 114c4-4 12-5 17-2M126 112c5-3 13-2 17 2"
          fill="none"
          strokeWidth="2.6"
        />
        <path d="M119 132c-4 6-3 11 2 12" fill="none" strokeWidth="2.5" />

        {/* mouth, just showing under the moustache */}
        <path d="M109 161c7 10 18 10 24 0z" fill={MOUTH} />
        <path d="M115 165c4 4 9 4 12 0z" fill="var(--color-lac)" strokeWidth="1.6" />

        {/* the safa */}
        <g transform="translate(0 -14)">
          {/* its loose end, hanging behind the shoulder */}
          <path
            d="M164 88c16 2 28 12 33 28 5 17 4 38-2 58l-10-6-8 8c-2-20-6-37-14-50-6-10-14-17-23-20z"
            fill="var(--color-lac)"
          />
          <g fill="none" stroke="var(--color-marigold)" strokeWidth="2.6">
            <path d="M170 100c12 6 19 18 22 34" />
            <path d="M164 116c11 7 17 19 19 34" />
            <path d="M158 132c9 8 14 20 15 34" />
          </g>

          {/* four broad folds */}
          <g fill="var(--color-lac)">
            <path d="M54 104c-8-18 6-34 29-41 25-9 59-8 82 3 21 10 27 25 20 38-10 16-39 22-68 21-32-1-56-7-63-21z" />
            <path d="M60 81c-8-17 6-32 27-39 24-8 55-8 74 1 19 9 24 23 18 34-9 15-35 21-61 20-28-1-51-5-58-16z" />
            <path d="M70 58c-7-15 5-27 23-33 21-6 46-6 62 2 16 8 20 19 15 29-8 12-30 17-51 16-24-1-44-5-49-14z" />
            <path d="M84 37c-5-12 4-22 18-26 17-5 36-5 48 2 12 7 15 16 11 23-7 10-24 14-39 13-18 0-35-4-38-12z" />
          </g>

          {/* the contour of each fold, so it reads as wound cloth */}
          <g fill="none" strokeWidth="2.4">
            <path d="M56 95c16 11 44 15 70 14 22-1 40-5 51-12" />
            <path d="M62 72c16 11 42 14 64 13 21-1 37-4 47-11" />
            <path d="M72 50c15 9 38 12 58 11 19-1 32-3 41-8" />
          </g>

          {/* leheriya, on the fold at the brow */}
          <g fill="none" stroke="var(--color-marigold)" strokeWidth="2.6">
            <path d="M66 108l8-14M82 113l8-15M98 116l8-15M114 117l8-15M130 116l8-15M146 113l8-15M162 108l8-14" />
          </g>

          {/* bandhani */}
          <g stroke="none">
            <g fill="var(--color-cream)">
              <circle cx="88" cy="78" r="2.7" />
              <circle cx="122" cy="86" r="2.7" />
              <circle cx="156" cy="78" r="2.7" />
              <circle cx="96" cy="57" r="2.7" />
              <circle cx="132" cy="63" r="2.7" />
              <circle cx="162" cy="58" r="2.7" />
              <circle cx="108" cy="36" r="2.7" />
              <circle cx="136" cy="38" r="2.7" />
              <circle cx="70" cy="86" r="2.4" />
              <circle cx="172" cy="86" r="2.4" />
            </g>
            <g fill="var(--color-marigold)">
              <circle cx="104" cy="82" r="2.3" />
              <circle cx="140" cy="83" r="2.3" />
              <circle cx="114" cy="60" r="2.3" />
              <circle cx="148" cy="61" r="2.3" />
              <circle cx="122" cy="37" r="2.3" />
              <circle cx="98" cy="42" r="2.3" />
            </g>
            <g fill="var(--color-mehendi)">
              <circle cx="74" cy="72" r="2.3" />
              <circle cx="170" cy="72" r="2.3" />
              <circle cx="84" cy="51" r="2.3" />
              <circle cx="150" cy="49" r="2.3" />
              <circle cx="116" cy="49" r="2.3" />
            </g>
          </g>
        </g>

        {/* the moustache, tips turned up, outlined in cream so it survives the
            ink page it hangs out over */}
        <g stroke="var(--color-cream)" strokeWidth="1.8" fill="var(--color-ink)">
          <path d="M118 147c-9-7-23-9-37-4-16 6-30 6-43 0 6 8 14 14 24 16 14 3 28 1 38-3 8-3 14-6 18-9z" />
          <path d="M38 143c-4-4-6-8-6-12 2 5 6 9 12 11z" strokeWidth="1.4" />
          <path d="M118 147c9-7 23-9 37-4 16 6 30 6 43 0-6 8-14 14-24 16-14 3-28 1-38-3-8-3-14-6-18-9z" />
          <path d="M198 143c4-4 6-8 6-12-2 5-6 9-12 11z" strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
}
