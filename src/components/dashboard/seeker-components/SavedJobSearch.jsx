"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const SavedJobSearch = ({ initialSearch = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-xl p-1.5 flex items-center shadow-md focus-within:border-zinc-700 transition-all duration-200"
    >
      <div className="flex items-center justify-center pl-3 text-zinc-400">
        <FiSearch className="text-base" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search saved jobs by name..."
        className="w-full bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none px-3 py-1.5"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer mr-1"
          title="Clear search"
        >
          <FiX className="text-base" />
        </button>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-zinc-950 font-bold px-4 py-2 rounded-lg text-xs hover:bg-primary/90 transition-all cursor-pointer shrink-0 disabled:opacity-50"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SavedJobSearch;
