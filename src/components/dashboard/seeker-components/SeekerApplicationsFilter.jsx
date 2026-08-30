"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiSearch, FiX, FiFilter, FiChevronDown } from "react-icons/fi";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "applied", label: "Applied" },
  { value: "screening", label: "Screening" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

/**
 * SeekerApplicationsFilter Component
 * Handles job title search and status filter options for Seeker Applications.
 *
 * @param {Object} props
 * @param {string} props.initialSearch - Initial job title search term from URL.
 * @param {string} props.initialStatus - Initial status filter option from URL.
 */
const SeekerApplicationsFilter = ({ initialSearch = "", initialStatus = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus || "all");

  const updateQueryParams = (newSearch, newStatus) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch && newSearch.trim()) {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }

    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    updateQueryParams(searchTerm, selectedStatus);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateQueryParams("", selectedStatus);
  };

  const handleStatusChange = (e) => {
    const nextStatus = e.target.value;
    setSelectedStatus(nextStatus);
    updateQueryParams(searchTerm, nextStatus);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex-1 max-w-md bg-zinc-900/80 border border-zinc-800 rounded-xl p-1.5 flex items-center shadow-md focus-within:border-zinc-700 transition-all duration-200"
      >
        <div className="flex items-center justify-center pl-3 text-zinc-400">
          <FiSearch className="text-base" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search applications by job name..."
          className="w-full bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none px-3 py-1.5"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
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

      {/* Status Select Filter */}
      <div className="relative inline-flex items-center min-w-45">
        <div className="pointer-events-none absolute left-3 flex items-center text-zinc-400">
          <FiFilter className="size-3.5" />
        </div>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          disabled={isPending}
          className="w-full appearance-none bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-9 py-3 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer transition-all duration-200 disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-zinc-900 text-zinc-200 py-1">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 flex items-center text-zinc-400">
          <FiChevronDown className="size-3.5" />
        </div>
      </div>
    </div>
  );
};

export default SeekerApplicationsFilter;
