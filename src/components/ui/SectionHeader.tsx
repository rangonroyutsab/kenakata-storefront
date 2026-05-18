import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeader({ action, title }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-headline text-3xl font-bold text-[var(--on-surface)]">
        {title}
      </h2>
      {action}
    </div>
  );
}
