"use client";

import { useId } from "react";

type SearchInputProps = {
    id?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

export function SearchInput({
    id,
    placeholder = "Search products...",
    value,
    onChange,
}: SearchInputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div>
            <label htmlFor={inputId} className="sr-only">
                Search products
            </label>

            <div className="relative">
                <input
                    id={inputId}
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-5 py-3 pr-24 text-sm text-[var(--on-surface)] outline-none transition placeholder:text-[var(--on-surface-variant)] focus:border-[var(--primary)]"
                />

                {value ? (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-[var(--on-primary)] transition hover:bg-[var(--primary-strong)]"
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}
