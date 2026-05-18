"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Leaf } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

const DEFAULT_AVATAR = "https://i.imgur.com/6VBx3io.png";

export default function SignupPage() {
  const router = useRouter();
  const { isLoading, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signup({
        name,
        email,
        password,
        avatar: DEFAULT_AVATAR,
      });
      router.push("/login?signup=success");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to create your account."
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 md:p-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--outline-variant)]/30 bg-[var(--surface-bright)] shadow-soft md:grid-cols-[45fr_55fr]">
        <div className="relative hidden bg-[var(--surface-container-highest)] md:block">
          <div className="absolute inset-0 bg-[var(--primary)]/10" />
          <p className="font-headline absolute bottom-8 left-8 text-xl italic text-[var(--surface-bright)] drop-shadow">
            Rooted Warmth for your Home
          </p>
        </div>
        <div className="p-8 md:p-14">
          <div className="mb-10">
            <Link
              className="mb-6 flex items-center gap-2 text-[var(--primary)]"
              href="/"
            >
              <Leaf size={28} fill="currentColor" />
              <span className="font-headline text-2xl font-bold">
                KenaKata
              </span>
            </Link>
            <h1 className="font-headline text-4xl font-bold">
              Create an account
            </h1>
            <p className="mt-3 text-[var(--on-surface-variant)]">
              Join our community and bring natural warmth into your space.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              required
              type="text"
              value={name}
            />
            <FormField
              label="Email Address"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@example.com"
              required
              type="email"
              value={email}
            />
            <FormField
              label="Password"
              minLength={4}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
            <FormField
              error={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match."
                  : undefined
              }
              label="Confirm Password"
              minLength={4}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
            {error ? (
              <p className="rounded-lg bg-[var(--error-container)] px-4 py-3 text-sm font-semibold text-[var(--error)]">
                {error}
              </p>
            ) : null}
            <Button className="w-full py-4 text-base" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Account"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-8 border-t border-[var(--outline-variant)]/20 pt-6 text-center text-[var(--on-surface-variant)]">
            Already have an account?{" "}
            <Link
              className="font-bold text-[var(--primary)] underline underline-offset-4"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
