const IST = "Asia/Kolkata";

/** Parts of the current time in IST, wherever the machine actually is. */
export function istParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  );
  const hour24 = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: IST,
      hour: "2-digit",
      hour12: false,
    }).format(date)
  );
  return {
    clock: `${parts.hour}:${parts.minute} ${(parts.dayPeriod || "").toLowerCase()}`.trim(),
    date: `${parts.weekday}, ${parts.day} ${parts.month} · IST`,
    hour24: hour24 === 24 ? 0 : hour24,
  };
}

/** Which backdrop the illustration should use, for a given hour in IST.
 *  This is purely scenery — it does not choose the collection. */
export function sceneForHour(hour) {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

/** Rajasthani/Hindi greeting for the hour, as the shop would say it. */
export function greetingForHour(hour) {
  if (hour >= 5 && hour < 12) return "खम्मा घणी";
  if (hour >= 12 && hour < 17) return "राम राम सा";
  if (hour >= 17 && hour < 21) return "शुभ संध्या";
  return "शुभ रात्रि";
}

/** Indian digit grouping: 1,06,130 rather than 106,130. */
export function indianNumber(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}
