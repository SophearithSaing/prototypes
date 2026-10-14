export const GITHUB_USERNAME = "SophearithSaing";

export interface ActivityDay {
  date: string;
  count: number;
  weekday: number;
  week: number;
  future: boolean;
}

const DAY = 86_400_000;

export function parseActivity(
  payload: unknown,
  today = new Date(),
): ActivityDay[] {
  if (
    !payload ||
    typeof payload !== "object" ||
    !("contributions" in payload) ||
    !Array.isArray(payload.contributions) ||
    payload.contributions.length === 0
  ) {
    throw new Error("GitHub activity is unavailable.");
  }

  const counts = new Map<string, number>();
  for (const day of payload.contributions) {
    if (
      !day ||
      typeof day.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
      !Number.isSafeInteger(day.count) ||
      day.count < 0
    ) {
      throw new Error("Invalid GitHub activity data.");
    }
    const timestamp = Date.parse(`${day.date}T00:00:00Z`);
    if (
      !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== day.date ||
      counts.has(day.date)
    ) {
      throw new Error("Invalid GitHub activity date.");
    }
    counts.set(day.date, day.count);
  }

  const dates = [...counts.keys()].sort();
  const start = Date.parse(`${dates[0]}T00:00:00Z`);
  const end = Date.parse(`${dates[dates.length - 1]}T00:00:00Z`);
  if ((end - start) / DAY > 371) throw new Error("Invalid activity period.");
  const offset = new Date(start).getUTCDay();
  const todayKey = today.toISOString().slice(0, 10);
  const days: ActivityDay[] = [];
  for (let time = start; time <= end; time += DAY) {
    const date = new Date(time).toISOString().slice(0, 10);
    // An absent day is unknown, rather than an invented zero-contribution day.
    if (!counts.has(date)) throw new Error("Incomplete GitHub activity data.");
    days.push({
      date,
      count: counts.get(date)!,
      weekday: new Date(time).getUTCDay(),
      week: Math.floor(((time - start) / DAY + offset) / 7),
      future: date > todayKey,
    });
  }
  return days;
}

export function activityStats(days: ActivityDay[]) {
  let total = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let streak = 0;
  let bestDay = 0;
  for (const day of days) {
    if (day.future) continue;
    total += day.count;
    bestDay = Math.max(bestDay, day.count);
    streak = day.count > 0 ? streak + 1 : 0;
    if (day.count > 0) activeDays++;
    longestStreak = Math.max(longestStreak, streak);
  }
  return { total, activeDays, longestStreak, bestDay };
}

export function columnHeight(count: number, peak: number) {
  return count > 0 && peak > 0 ? 0.16 + Math.sqrt(count / peak) * 2.8 : 0.055;
}

export function formatActivityDate(date: string, short = false) {
  return new Intl.DateTimeFormat("en", {
    month: short ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
