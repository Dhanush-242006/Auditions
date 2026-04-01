export type NotificationType =
  | "invitation"
  | "reply"
  | "shortlisted"
  | "application"
  | "audition_new"
  | "callback"
  | "offer";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  read: boolean;
  createdAt: string;
}

const KEY = "auditions_notifications";

export function getNotifications(): AppNotification[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(items: AppNotification[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("auditions_notifications_updated"));
}

export function pushNotification(
  data: Omit<AppNotification, "id" | "read" | "createdAt">
): AppNotification {
  const n: AppNotification = {
    ...data,
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    read: false,
    createdAt: new Date().toISOString(),
  };
  const all = getNotifications();
  all.unshift(n);
  // keep max 50
  save(all.slice(0, 50));
  return n;
}

export function markAllRead(): void {
  const all = getNotifications().map((n) => ({ ...n, read: true }));
  save(all);
}

export function markOneRead(id: string): void {
  const all = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  save(all);
}

export function clearAll(): void {
  save([]);
}

export function getUnreadCount(): number {
  return getNotifications().filter((n) => !n.read).length;
}

export function subscribeNotifications(cb: () => void): () => void {
  window.addEventListener("auditions_notifications_updated", cb);
  return () => window.removeEventListener("auditions_notifications_updated", cb);
}
