import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-strong)]",
  secondary:
    "border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--primary)] hover:bg-[var(--surface-container-low)]",
  tertiary:
    "bg-[var(--tertiary)] text-[var(--on-primary)] hover:bg-[var(--tertiary-strong)]",
  ghost:
    "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--primary)]",
};

export function buttonClassName(variant: ButtonVariant = "primary") {
  return `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]}`;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonClassName(variant)} ${className}`}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonClassName(variant)} ${className}`}
      {...props}
    />
  );
}
