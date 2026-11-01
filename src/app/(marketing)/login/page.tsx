import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/saved");

  const { error } = await searchParams;

  return (
    <div className="container grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-6 lg:pr-16">
        <p className="kicker text-accent-strong">Reading list</p>
        <h1 className="mt-5 font-display text-5xl leading-[0.98] font-medium tracking-[-0.035em] text-balance sm:text-6xl">
          Keep the good ones.
        </h1>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
          Sign in to save stories from any edition and find them again on any device. We email you a link, so there is
          no password to remember.
        </p>
        <p className="mt-8 border-t border-border pt-4 text-[13px] text-muted">
          Reading and briefs work without an account.
        </p>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <div className="bg-surface p-6 outline -outline-offset-1 outline-border sm:p-8">
          <h2 className="font-display text-2xl font-medium tracking-[-0.015em]">Sign in with email</h2>
          {error && (
            <p role="alert" className="mt-4 border-l-2 border-danger bg-danger-soft px-3 py-2 text-sm text-danger">
              That sign-in link is invalid or has expired. Request a new one below.
            </p>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
