import type { ComponentProps, ReactNode } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  icon?: ReactNode;
};

export function FormField({
  className = "",
  error,
  icon,
  id,
  label,
  ...props
}: FormFieldProps) {
  return (
    <label className="block text-sm font-semibold text-[var(--on-surface)]">
      <span>{label}</span>
      <span className="relative mt-2 block">
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--on-surface-variant)]">
            {icon}
          </span>
        ) : null}
        <input
          aria-invalid={Boolean(error)}
          className={`w-full rounded-lg border bg-[var(--surface)] px-4 py-3 text-[var(--on-surface)] transition placeholder:text-[var(--on-surface-variant)]/60 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 ${
            icon ? "pl-11" : ""
          } ${
            error
              ? "border-[var(--error)] bg-[var(--error-container)]/20"
              : "border-[var(--outline-variant)]"
          } ${className}`}
          id={id}
          {...props}
        />
      </span>
      {error ? (
        <span className="mt-2 block text-sm font-medium text-[var(--error)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
