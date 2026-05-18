type SearchInputProps = {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

export function SearchInput({
    placeholder = "Search products...",
    value,
    onChange,
}: SearchInputProps) {
    return (
        <div className="mb-8">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>

            <input
                id="product-search"
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            />
        </div>
    );
}