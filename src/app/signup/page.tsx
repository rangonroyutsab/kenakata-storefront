"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  function getNextPath() {
    const requestedPath = new URLSearchParams(window.location.search).get("next");
    return requestedPath?.startsWith("/") ? requestedPath : "/account";
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      nextErrors.name = "Full name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 4) {
      nextErrors.password = "Password must be at least 4 characters.";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(nextErrors);

    return {
      isValid: Object.keys(nextErrors).length === 0,
      trimmedEmail,
      trimmedName,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const { isValid, trimmedEmail, trimmedName } = validateForm();

    if (!isValid) {
      return;
    }

    try {
      await signup({
        name: trimmedName,
        email: trimmedEmail,
        password,
        avatar: DEFAULT_AVATAR,
      });
      router.push(getNextPath());
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
      <section className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--outline-variant)]/30 bg-[var(--surface-bright)] p-8 shadow-soft md:p-14">
          <div className="mb-10">
            <Link
              className="mb-6 flex items-center gap-2 text-[var(--primary)]"
              href="/"
            >
              <ShoppingBag size={28} />
              <span className="font-headline text-2xl font-bold">
                KenaKata
              </span>
            </Link>
            <h1 className="font-headline text-4xl font-bold">
              Create an account
            </h1>
            <p className="mt-3 text-[var(--on-surface-variant)]">
              Create an account to save your profile and speed up checkout.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              error={fieldErrors.name}
              label="Full Name"
              onChange={(event) => {
                setName(event.target.value);
                setFieldErrors((current) => ({ ...current, name: "" }));
              }}
              placeholder="Jane Doe"
              required
              type="text"
              value={name}
            />
            <FormField
              error={fieldErrors.email}
              label="Email Address"
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldErrors((current) => ({ ...current, email: "" }));
              }}
              placeholder="jane@example.com"
              required
              type="email"
              value={email}
            />
            <FormField
              error={fieldErrors.password}
              label="Password"
              minLength={4}
              onChange={(event) => {
                setPassword(event.target.value);
                setFieldErrors((current) => ({
                  ...current,
                  password: "",
                  confirmPassword: "",
                }));
              }}
              required
              type="password"
              value={password}
            />
            <FormField
              error={
                fieldErrors.confirmPassword ||
                (confirmPassword && password !== confirmPassword
                  ? "Passwords do not match."
                  : undefined)
              }
              label="Confirm Password"
              minLength={4}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setFieldErrors((current) => ({
                  ...current,
                  confirmPassword: "",
                }));
              }}
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
              {isLoading ? "Creating account..." : "Create Account"}
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
      </section>
    </main>
  );
}
