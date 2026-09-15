import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search destinations...",
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[16px] border border-primary/10 bg-white px-5 py-4 shadow-sm transition focus-within:border-primary focus-within:shadow-md">
      <Search
        size={22}
        className="shrink-0 text-primary"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text/40"
      />
    </div>
  );
}

export default SearchBar;