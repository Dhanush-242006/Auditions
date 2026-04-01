export interface AuditionInvitation {
  id: string;
  directorName: string;
  directorCompany: string;
  directorEmail: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  auditionTitle: string;
  role: string;
  auditionDate: string;
  location: string;
  message: string;
  sentAt: string;
  read: boolean;
  reply?: {
    message: string;
    sentAt: string;
  };
}

import { pushNotification } from "./notifications";

const KEY = "auditions_invitations";

export function getInvitations(): AuditionInvitation[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(items: AuditionInvitation[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("auditions_invitations_updated"));
}

export function sendInvitation(
  data: Omit<AuditionInvitation, "id" | "sentAt" | "read">
): AuditionInvitation {
  const inv: AuditionInvitation = {
    ...data,
    id: Date.now().toString(),
    sentAt: new Date().toISOString(),
    read: false,
  };
  const all = getInvitations();
  all.unshift(inv);
  save(all);
  pushNotification({
    type: "invitation",
    title: `Audition Invitation from ${data.directorCompany}`,
    body: `You've been invited to audition for "${data.auditionTitle}".`,
    href: "/dashboard",
  });
  return inv;
}

export function replyToInvitation(id: string, message: string): void {
  const all = getInvitations();
  const inv = all.find((i) => i.id === id);
  if (inv) {
    inv.reply = { message, sentAt: new Date().toISOString() };
    inv.read = true;
    save(all);
    pushNotification({
      type: "reply",
      title: `${inv.actorName} replied to your invitation`,
      body: `Re: "${inv.auditionTitle}" — "${message.slice(0, 60)}${message.length > 60 ? "…" : ""}"`,
      href: "/director-dashboard",
    });
  }
}

export function markRead(id: string): void {
  const all = getInvitations();
  const inv = all.find((i) => i.id === id);
  if (inv) {
    inv.read = true;
    save(all);
  }
}

export function getUnreadCount(): number {
  return getInvitations().filter((i) => !i.read).length;
}

export function subscribeInvitations(cb: () => void): () => void {
  window.addEventListener("auditions_invitations_updated", cb);
  return () => window.removeEventListener("auditions_invitations_updated", cb);
}
