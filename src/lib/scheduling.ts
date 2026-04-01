export interface AuditionSlot {
  id: string;
  auditionId: string;
  auditionTitle: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  duration: number; // minutes
  location: string;
  isBooked: boolean;
  bookedBy?: string;
  bookedAt?: string;
}

const KEY = "auditions_slots";

export function getSlots(auditionId?: string): AuditionSlot[] {
  try {
    const all: AuditionSlot[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return auditionId ? all.filter(s => s.auditionId === auditionId) : all;
  } catch { return []; }
}

export function saveSlots(slots: AuditionSlot[]): void {
  const all = getSlots();
  // replace slots belonging to the same auditionId, keep the rest
  const auditionId = slots[0]?.auditionId;
  const others = auditionId ? all.filter(s => s.auditionId !== auditionId) : all;
  localStorage.setItem(KEY, JSON.stringify([...others, ...slots]));
  window.dispatchEvent(new Event("auditions_slots_updated"));
}

export function bookSlot(slotId: string, actorName: string): boolean {
  try {
    const all: AuditionSlot[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    const idx = all.findIndex(s => s.id === slotId);
    if (idx === -1 || all[idx].isBooked) return false;
    all[idx] = { ...all[idx], isBooked: true, bookedBy: actorName, bookedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("auditions_slots_updated"));
    return true;
  } catch { return false; }
}

export function subscribeSlots(cb: () => void): () => void {
  window.addEventListener("auditions_slots_updated", cb);
  return () => window.removeEventListener("auditions_slots_updated", cb);
}

export function formatSlotTime(slot: AuditionSlot): string {
  const d = new Date(`${slot.date}T${slot.time}`);
  return d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })
    + " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}
