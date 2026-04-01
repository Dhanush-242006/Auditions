/** Extra profile fields filled via AI Assistant chat (and editable later on Profile). */

export type TalentProfileExtras = {
  bio?: string;
  location?: string;
  phone?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  experienceYears?: string;
  ageRange?: string;
  height?: string;
  weight?: string;
  eyes?: string;
  /** Replaces skills list when set from AI */
  skills?: string[];
};

const KEY = "talent_profile_extras";
const EVT = "talent-profile-extras-updated";

export function getTalentProfileExtras(): TalentProfileExtras {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as unknown;
    if (!p || typeof p !== "object") return {};
    return p as TalentProfileExtras;
  } catch {
    return {};
  }
}

export function mergeTalentProfileExtras(partial: Partial<TalentProfileExtras>): TalentProfileExtras {
  const cur = getTalentProfileExtras();
  const next: TalentProfileExtras = { ...cur, ...partial };
  if (partial.skills != null) next.skills = partial.skills;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVT));
  return next;
}

export function subscribeTalentProfileExtras(cb: () => void): () => void {
  const onCustom = () => cb();
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener(EVT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}
