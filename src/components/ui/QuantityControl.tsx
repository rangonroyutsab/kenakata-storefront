import { Minus, Plus } from "lucide-react";

type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseDisabled?: boolean;
};

export function QuantityControl({
  decreaseDisabled,
  onDecrease,
  onIncrease,
  quantity,
}: QuantityControlProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
      <button
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--on-surface-variant)] transition hover:text-[var(--primary)] disabled:opacity-40"
        disabled={decreaseDisabled}
        onClick={onDecrease}
        type="button"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center text-sm font-bold">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--on-surface-variant)] transition hover:text-[var(--primary)]"
        onClick={onIncrease}
        type="button"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
