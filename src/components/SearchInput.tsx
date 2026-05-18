type SearchInputProps = {
    placeholder?: string;
};

export function SearchInput({
    placeholder = "Search products...",
}: SearchInputProps) {
    return (
        <div className="mb-8">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>

            <input
                id="product-search"
                type="search"
                placeholder={placeholder}
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            />
        </div>
    );
}