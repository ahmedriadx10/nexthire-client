"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const roleTabs = [
  { id: "all", label: "All Users" },
  { id: "seeker", label: "Seekers" },
  { id: "recruiter", label: "Recruiters" },
  { id: "admin", label: "Admins" },
];

/**
 * AdminUsersSearchFilter
 * Search input + role filter tabs.
 * Updates searchParams in URL, causing server component page to re-fetch with new parameters.
 * When "All Users" tab is selected, role parameter is omitted from URL query string.
 *
 * @param {{ currentSearch: string, currentRole: string }} props
 */
const AdminUsersSearchFilter = ({
  currentSearch = "",
  currentRole = "all",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  // Sync input value if URL search changes externally
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateQueryParams = (newSearch, newRole) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or delete search param
    if (newSearch && newSearch.trim() !== "") {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }

    // Update or delete role param (omit if 'all' or empty)
    if (newRole && newRole !== "all") {
      params.set("role", newRole);
    } else {
      params.delete("role");
    }

    // Reset page to 1 whenever search or role filter changes
    params.delete("page");

    const queryString = params.toString();
    const targetUrl = queryString ? `?${queryString}` : "/dashboard/admin/users";

    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQueryParams(searchTerm, currentRole || "all");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateQueryParams("", currentRole || "all");
  };

  const handleRoleChange = (roleId) => {
    updateQueryParams(searchTerm, roleId);
  };

  const activeRole = currentRole?.toLowerCase() || "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-x-auto scrollbar-thin scrollbar-thumb-primary">
          {roleTabs.map((tab) => {
            const isActive = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                type="button"
                onClick={() => handleRoleChange(tab.id)}
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
            id="user-search-input"
            type="text"
            placeholder="Search by name or email..."
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

export default AdminUsersSearchFilter;
