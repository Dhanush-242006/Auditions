import type { Audition } from "@/src/types";

export const POSTED_AUDITIONS_KEY = "posted_auditions";

const EVENT_NAME = "posted-auditions-updated";

export function getPostedAuditions(): Audition[] {
  try {
    const raw = localStorage.getItem(POSTED_AUDITIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Audition => {
      if (!item || typeof item !== "object") return false;
      const a = item as Partial<Audition>;
      return typeof a.id === "string" && typeof a.title === "string";
    });
  } catch {
    return [];
  }
}

/** Newest first (same order as stored). */
export function savePostedAudition(audition: Audition): void {
  const existing = getPostedAuditions();
  localStorage.setItem(POSTED_AUDITIONS_KEY, JSON.stringify([audition, ...existing]));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function subscribePostedAuditions(callback: () => void): () => void {
  const onCustom = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === POSTED_AUDITIONS_KEY) callback();
  };
  window.addEventListener(EVENT_NAME, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}
