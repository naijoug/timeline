import type { HistoricalDate, TimeSpan } from "./types";

export function yearCoordinate(year: number): number {
  if (!Number.isInteger(year) || year === 0)
    throw new Error(`Invalid civil year: ${year}`);
  return year < 0 ? year + 1 : year;
}
export const civilYear = (coordinate: number) =>
  coordinate <= 0 ? coordinate - 1 : coordinate;
export const formatYear = (year: number) =>
  year < 0 ? `公元前 ${-year} 年` : `${year} 年`;
export const formatCoordinate = (coordinate: number) =>
  formatYear(civilYear(coordinate));
export function daysInMonth(year: number, month: number): number {
  const y = yearCoordinate(year);
  return month === 2
    ? y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)
      ? 29
      : 28
    : [4, 6, 9, 11].includes(month)
      ? 30
      : 31;
}
export function validDate(date: HistoricalDate): boolean {
  if (
    !Number.isSafeInteger(date.year) ||
    date.year === 0 ||
    Math.abs(date.year) > 100000
  )
    return false;
  if (date.month === undefined) return date.day === undefined;
  if (!Number.isInteger(date.month) || date.month < 1 || date.month > 12)
    return false;
  return (
    date.day === undefined ||
    (Number.isInteger(date.day) &&
      date.day >= 1 &&
      date.day <= daysInMonth(date.year, date.month))
  );
}
export function parseDate(value: string): HistoricalDate {
  const match = /^(-?\d{1,6})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value);
  if (!match) throw new Error(`Invalid date: ${value}`);
  const date: HistoricalDate = {
    year: Number(match[1]),
    ...(match[2] ? { month: Number(match[2]) } : {}),
    ...(match[3] ? { day: Number(match[3]) } : {}),
  };
  if (!validDate(date)) throw new Error(`Invalid date: ${value}`);
  return date;
}
/** Half-open bounds preserve the supplied precision; days use a proleptic Gregorian calendar. */
export function dateBounds(date: HistoricalDate): [number, number] {
  const y = yearCoordinate(date.year);
  if (!date.month) return [y, y + 1];
  const monthStart = y + (date.month - 1) / 12;
  if (!date.day) return [monthStart, y + date.month / 12];
  const days = daysInMonth(date.year, date.month);
  return [
    monthStart + (date.day - 1) / days / 12,
    monthStart + date.day / days / 12,
  ];
}
export function timeBounds(time: TimeSpan): [number, number] {
  return [dateBounds(time.start)[0], dateBounds(time.end || time.start)[1]];
}
export function timePosition(time: TimeSpan): number {
  if (!time.end) {
    const { year, month, day } = time.start,
      y = yearCoordinate(year);
    if (!month) return y + 0.5;
    if (!day) return y + (month - 0.5) / 12;
    return y + (month - 1 + (day - 0.5) / daysInMonth(year, month)) / 12;
  }
  const [a, b] = timeBounds(time);
  return a + (b - a) / 2;
}
export function overlaps(time: TimeSpan, from: number, to: number): boolean {
  const [a, b] = timeBounds(time);
  return a < to + 1 && b > from;
}
export function formatDate(date: HistoricalDate): string {
  return `${date.approximate ? "约 " : ""}${formatYear(date.year)}${date.month ? ` ${date.month} 月` : ""}${date.day ? ` ${date.day} 日` : ""}`;
}
export function formatTime(time: TimeSpan): string {
  return `${formatDate(time.start)}${time.end ? ` — ${formatDate(time.end)}` : ""}${time.kind === "uncertain" ? "（日期范围待考）" : ""}`;
}
export function clampRange(
  from: number,
  span: number,
  min: number,
  max: number,
): [number, number] {
  const safeSpan = Math.max(
    1,
    Math.min(
      max - min + 1,
      Math.round(Number.isFinite(span) ? span : max - min + 1),
    ),
  );
  const safeFrom = Math.max(
    min,
    Math.min(
      max - safeSpan + 1,
      Math.round(Number.isFinite(from) ? from : min),
    ),
  );
  return [safeFrom, safeFrom + safeSpan - 1];
}
export function yearTicks(from: number, to: number, width: number): number[] {
  const needed = Math.max(
    1,
    Math.ceil((to - from + 1) / Math.max(1, Math.floor(width / 100))),
  );
  const power = 10 ** Math.floor(Math.log10(needed));
  const step = [1, 2, 5, 10].map((n) => n * power).find((n) => n >= needed)!;
  const ticks: number[] = [];
  if (step === 1) {
    for (let y = from; y <= to; y++) ticks.push(y);
  } else {
    // Align labels to civil centuries/millennia, rather than astronomical year zero.
    for (
      let year = Math.ceil((from - 1) / step) * step;
      year < 0;
      year += step
    ) {
      const coordinate = yearCoordinate(year);
      if (coordinate >= from && coordinate <= to) ticks.push(coordinate);
    }
    if (from <= 1 && to >= 1) ticks.push(1);
    for (
      let year = Math.max(step, Math.ceil(from / step) * step);
      year <= to;
      year += step
    )
      ticks.push(year);
  }
  return ticks.length ? ticks : [from];
}
