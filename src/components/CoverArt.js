"use client";

import { useEffect, useState } from "react";
import { coverCandidates } from "@/lib/links";

/**
 * A track's sleeve.
 *
 * YouTube serves several thumbnail sizes and not every upload has the largest,
 * so this walks down the list on error and, if none of them load, paints a
 * medallion instead of leaving a hole. Square by default: the source is 16:9,
 * so it is cropped from the centre rather than letterboxed.
 */
export default function CoverArt({ youtubeId, alt = "", className = "", eager = false }) {
  const candidates = coverCandidates(youtubeId);
  const [step, setStep] = useState(0);

  // A new track means a new sleeve: start again at the largest size.
  useEffect(() => setStep(0), [youtubeId]);

  const src = candidates[step];

  return (
    <span
      className={`relative block overflow-hidden bg-gradient-to-br from-indigo via-ink2 to-ink ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setStep((s) => s + 1)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="grid h-full w-full place-items-center">
          <span className="h-1/3 w-1/3 rounded-full border-2 border-marigold/60 bg-lac/70" />
        </span>
      )}
    </span>
  );
}
