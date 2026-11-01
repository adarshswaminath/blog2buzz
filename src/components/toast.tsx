"use client";

import { CircleAlert, X } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AnimatedCheck } from "./animated-check";

type Toast = {
  id: number;
  message: string;
  tone?: "success" | "error";
  action?: { label: string; href: string };
};

// A tiny global store, so any client component can call toast() without a provider.
let toasts: Toast[] = [];
const listeners = new Set<() => void>();
const EMPTY: Toast[] = [];

function emit() {
  listeners.forEach((listener) => listener());
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Show a short confirmation, e.g. toast("Saved", { tone: "success", action: { label: "View", href: "/saved" } }) */
export function toast(message: string, options: Omit<Toast, "id" | "message"> = {}) {
  const id = Date.now() + Math.random();
  toasts = [...toasts.slice(-2), { id, message, ...options }];
  emit();
  setTimeout(() => dismiss(id), options.tone === "error" ? 6000 : 4000);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function Toaster() {
  const items = useSyncExternalStore(subscribe, () => toasts, () => EMPTY);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end"
    >
      {items.map((t) => (
        <div
          key={t.id}
          role={t.tone === "error" ? "alert" : "status"}
          className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-center gap-3 rounded-md bg-fg py-2.5 pr-2 pl-3.5 text-sm text-white shadow-overlay"
        >
          {t.tone === "success" && <AnimatedCheck className="size-4 shrink-0 text-accent-on-dark" />}
          {t.tone === "error" && <CircleAlert className="size-4 shrink-0 text-accent-on-dark" />}
          <p className="flex-1">{t.message}</p>
          {t.action && (
            <Link
              href={t.action.href}
              onClick={() => dismiss(t.id)}
              className="rounded-sm px-2 py-1 font-medium text-accent-on-dark transition-colors hover:bg-white/10"
            >
              {t.action.label}
            </Link>
          )}
          <button
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss"
            className="flex size-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
