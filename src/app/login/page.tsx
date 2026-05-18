"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, login } = useAuth();
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login({ email, password });
      router.push("/account");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to log in. Please try again."
      );
    }
  }

  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[5fr_7fr]">
      <section className="relative hidden bg-[var(--surface-container)] lg:block">
        <div className="absolute inset-0 bg-[var(--primary)]/10" />
        <div className="absolute bottom-12 left-12 max-w-sm rounded-xl bg-[var(--surface-container-lowest)]/85 p-8 shadow-soft backdrop-blur-md">
          <h1 className="font-headline text-3xl font-bold text-[var(--primary)]">
            Rooted Warmth
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Welcome back to KenaKata. Reconnect with nature through our curated
            collection of organic home goods.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl border border-[var(--outline-variant)]/20 bg-[var(--surface-container-lowest)] p-8 shadow-soft sm:p-10">
          <div className="mb-10 text-center">
            <Link
              className="font-headline text-4xl font-bold text-[var(--primary)]"
              href="/"
            >
              KenaKata
            </Link>
            <p className="mt-2 text-lg text-[var(--on-surface-variant)]">
              Log in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              autoComplete="email"
              icon={<Mail size={19} />}
              label="Email Address"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
            <FormField
              autoComplete="current-password"
              icon={<Lock size={19} />}
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
            {error ? (
              <p className="rounded-lg bg-[var(--error-container)] px-4 py-3 text-sm font-semibold text-[var(--error)]">
                {error}
              </p>
            ) : null}
            <Button className="w-full py-4 text-base" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-8 border-t border-[var(--outline-variant)]/30 pt-6 text-center text-sm text-[var(--on-surface-variant)]">
            New to KenaKata?{" "}
            <Link
              className="font-bold text-[var(--tertiary)] underline underline-offset-4"
              href="/signup"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
