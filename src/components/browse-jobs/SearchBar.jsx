"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const { setParam } = useQueryParams();

  const handleSearch = () => {
    setParam("search", query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex gap-3 w-full items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
      {/* Search input — native input styled with Tailwind */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <FiSearch className="text-zinc-500 shrink-0 ml-1 text-base" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by job title, keywords..."
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none border-none min-w-0"
        />
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="shrink-0 bg-white text-zinc-900 text-sm font-semibold px-6 py-2 rounded-xl hover:bg-zinc-100 active:bg-zinc-200 transition-colors duration-150"
      >
        Search Jobs
      </button>
    </div>
  );
};

export default SearchBar;
