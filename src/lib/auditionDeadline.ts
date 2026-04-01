import type { Audition } from "@/src/types";

/** End of deadline as a Date, or null if unparseable. */
export function getAuditionDeadlineEnd(a: Audition): Date | null {
  if (a.deadlineIso) {
    const d = new Date(a.deadlineIso);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const parsed = Date.parse(a.deadline);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  const d2 = new Date(`${a.deadline}T23:59:59`);
  return Number.isNaN(d2.getTime()) ? null : d2;
}

/**
 * Deadline is still in the future and within the next `maxHours` hours (e.g. 48 = two days).
 */
export function isDeadlineWithinUpcomingHours(a: Audition, maxHours: number): boolean {
  const end = getAuditionDeadlineEnd(a);
  if (!end) return false;
  const now = Date.now();
  const msLeft = end.getTime() - now;
  const maxMs = maxHours * 60 * 60 * 1000;
  return msLeft >= 0 && msLeft <= maxMs;
}

export function formatTimeUntilDeadline(a: Audition): string {
  const end = getAuditionDeadlineEnd(a);
  if (!end) return a.deadline;
  const msLeft = end.getTime() - Date.now();
  if (msLeft < 0) return "Closed";
  const hours = Math.floor(msLeft / (60 * 60 * 1000));
  if (hours < 1) {
    const mins = Math.max(1, Math.floor(msLeft / (60 * 1000)));
    return `${mins} min left`;
  }
  if (hours < 48) return `${hours}h left`;
  const days = Math.floor(hours / 24);
  return `${days}d left`;
}
