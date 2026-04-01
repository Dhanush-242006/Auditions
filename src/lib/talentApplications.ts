import type { Audition } from "@/src/types";

/** Persisted when talent confirms an application from Find Auditions. */
export interface StoredTalentApplication {
  auditionId: string;
  appliedAt: string;
  title: string;
  company: string;
  category: string;
  location: string;
  deadline: string;
  description: string;
  gender: string;
  ageRange: string;
}

const STORAGE_KEY = "talent_applications";
const EVENT_NAME = "talent-applications-updated";

function isStoredApp(x: unknown): x is StoredTalentApplication {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.auditionId === "string" && typeof o.appliedAt === "string" && typeof o.title === "string";
}

export function getTalentApplications(): StoredTalentApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredApp);
  } catch {
    return [];
  }
}

export function getAppliedAuditionIds(): Set<string> {
  return new Set(getTalentApplications().map((a) => a.auditionId));
}

export function addTalentApplication(audition: Audition): void {
  const list = getTalentApplications();
  if (list.some((a) => a.auditionId === audition.id)) return;
  const row: StoredTalentApplication = {
    auditionId: audition.id,
    appliedAt: new Date().toISOString(),
    title: audition.title,
    company: audition.company,
    category: audition.category,
    location: audition.location,
    deadline: audition.deadline,
    description: audition.description,
    gender: audition.gender,
    ageRange: audition.ageRange,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([row, ...list]));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function subscribeTalentApplications(callback: () => void): () => void {
  const onCustom = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener(EVENT_NAME, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

export function formatSubmittedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const now = Date.now();
  const diffMs = now - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}
