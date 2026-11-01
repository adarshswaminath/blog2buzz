"use client";

import { useState } from "react";
import { buttonClass } from "@/components/button";
import { MailSentIllustration } from "@/components/illustrations";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const invalid = touched && !EMAIL_PATTERN.test(email);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!EMAIL_PATTERN.test(email)) return;

    setStatus("sending");
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div role="status" className="mt-6 animate-fade-up">
        <MailSentIllustration />
        <p className="mt-4 font-display text-xl font-medium">Check your inbox</p>
        <p className="mt-1 text-[15px] text-muted">
          We sent a sign-in link to <span className="font-medium text-fg">{email}</span>.
        </p>
        <button onClick={() => setStatus("idle")} className={buttonClass("ghost", "sm", "mt-4 -ml-3")}>
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col">
      <label htmlFor="email" className="kicker text-muted">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={() => email && setTouched(true)}
        aria-invalid={invalid}
        aria-describedby="email-message"
        className={cn(
          "mt-2 h-11 rounded-md border bg-surface px-3 text-[15px] transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:ring-3 focus:outline-none",
          invalid
            ? "border-danger/60 focus:border-danger focus:ring-danger/15"
            : "border-border-strong focus:border-fg focus:ring-accent/20",
        )}
      />
      {/* Fixed height so messages never shift the button. */}
      <p id="email-message" aria-live="polite" className="mt-1.5 h-4 text-xs text-danger">
        {invalid ? "Enter a valid email address." : status === "error" ? "Could not send the link. Please try again." : ""}
      </p>
      <button disabled={status === "sending"} className={buttonClass("primary", "lg", "mt-3")}>
        {status === "sending" ? "Sending link…" : "Continue with email"}
      </button>
    </form>
  );
}
