"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

const CompanySearch = ({ initialSearch = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
// console.log('search params is here',searchParams)
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    // Reset to page 1 when search query changes
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
      className="relative w-full max-w-4xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-2 sm:p-2.5 flex items-center shadow-lg focus-within:border-zinc-700 transition-all duration-200"
    >
      <div className="flex items-center justify-center pl-3 pr-2 text-zinc-400">
        <RiSearchLine className="text-lg sm:text-xl" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, industry, or location..."
        className="w-full bg-transparent text-white text-xs sm:text-sm md:text-base placeholder-zinc-500 focus:outline-none px-2 py-1.5"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors mr-1 cursor-pointer"
          title="Clear search"
        >
          <RiCloseLine className="text-lg" />
        </button>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-white hover:bg-zinc-200 disabled:opacity-70 text-zinc-950 font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shrink-0 cursor-pointer shadow-md"
      >
        {isPending ? "Searching..." : "Find Companies"}
      </button>
    </form>
  );
};

export default CompanySearch;
