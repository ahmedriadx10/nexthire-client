"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const statusTabs = [
  { id: "all", label: "All Companies" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

/**
 * AdminCompaniesSearchFilter
 * Search input + status filter tabs.
 * Updates searchParams in URL, causing server component page to re-fetch with new parameters.
 * When "All" tab is selected, status parameter is omitted from URL query string.
 *
 * @param {{ currentSearch: string, currentStatus: string }} props
 */
const AdminCompaniesSearchFilter = ({
  currentSearch = "",
  currentStatus = "all",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  // Sync input value if URL search changes externally
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateQueryParams = (newSearch, newStatus) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or delete search param
    if (newSearch && newSearch.trim() !== "") {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }

    // Update or delete status param
    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    // Reset page to 1 whenever search or status filter changes
    params.delete("page");

    const queryString = params.toString();
    const targetUrl = queryString ? `?${queryString}` : "/dashboard/admin/companies";

    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQueryParams(searchTerm, currentStatus || "all");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateQueryParams("", currentStatus || "all");
  };

  const handleStatusChange = (statusId) => {
    updateQueryParams(searchTerm, statusId);
  };

  const activeStatus = currentStatus?.toLowerCase() || "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-x-auto">
          {statusTabs.map((tab) => {
            const isActive = activeStatus === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                type="button"
                onClick={() => handleStatusChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-zinc-950 shadow-md shadow-primary/10 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center min-w-70 sm:min-w-[320px]"
        >
          <FiSearch className="absolute left-3.5 size-4 text-zinc-500 pointer-events-none" />
          <input
            id="company-search-input"
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80
              text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700
              focus:ring-1 focus:ring-zinc-700 transition-all duration-200"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 p-1 text-zinc-500 hover:text-white transition-colors"
            >
              <FiX className="size-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Loading state indicator */}
      {isPending && (
        <div className="h-0.5 w-full bg-zinc-800 overflow-hidden rounded-full">
          <div className="h-full bg-primary animate-pulse w-1/3" />
        </div>
      )}
    </div>
  );
};

export default AdminCompaniesSearchFilter;
