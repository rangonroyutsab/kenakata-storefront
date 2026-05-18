import type { ComponentProps, ReactNode } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  label: string;
};

export function IconButton({
  children,
  className = "",
  label,
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary)] transition hover:bg-[var(--surface-container-low)] active:scale-95 ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
