import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getLocalItem(key: string): string | null {
  const storage = safeLocalStorage();
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function setLocalItem(key: string, value: string): void {
  const storage = safeLocalStorage();
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    // Storage full or blocked
  }
}

export function removeLocalItem(key: string): void {
  const storage = safeLocalStorage();
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
}
