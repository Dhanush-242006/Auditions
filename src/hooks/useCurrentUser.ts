import { useCallback, useEffect, useState } from "react";

export interface StoredUser {
  email: string;
  role: string;
  demo?: boolean;
  name?: string;
  avatarUrl?: string;
}

const STORAGE_KEY = "user";
export const USER_STORAGE_UPDATED_EVENT = "auditions-user-storage-updated";

function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredUser;
    return parsed && typeof parsed.email === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function useCurrentUser() {
  const [stored, setStored] = useState<StoredUser | null>(getStoredUser);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setStored(getStoredUser());
    };
    const onLocalUser = () => setStored(getStoredUser());
    window.addEventListener("storage", onStorage);
    window.addEventListener(USER_STORAGE_UPDATED_EVENT, onLocalUser);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(USER_STORAGE_UPDATED_EVENT, onLocalUser);
    };
  }, []);

  const updateUser = useCallback((updates: { name?: string; avatarUrl?: string }) => {
    const current = getStoredUser();
    if (!current) return;
    const next = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStored(next);
    window.dispatchEvent(new CustomEvent(USER_STORAGE_UPDATED_EVENT));
  }, []);

  if (!stored) {
    return {
      name: null,
      firstName: null,
      email: null,
      role: null,
      avatarUrl: null,
      isDemo: false,
      updateUser,
    };
  }

  const name = stored.name?.trim() || stored.email?.split("@")[0] || "User";
  const firstName = name.split(/\s+/)[0] || name;

  return {
    name,
    firstName,
    email: stored.email,
    role: stored.role,
    avatarUrl: stored.avatarUrl ?? null,
    isDemo: Boolean(stored.demo),
    updateUser,
  };
}

/** Update display name in stored `user` (e.g. from AI Assistant). Returns false if not logged in. */
export function applyStoredUserName(name: string): boolean {
  const current = getStoredUser();
  const trimmed = name.trim();
  if (!current || !trimmed) return false;
  const next = { ...current, name: trimmed };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(USER_STORAGE_UPDATED_EVENT));
  return true;
}
