"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Screening", value: "screening" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Interview", value: "interview" },
  { label: "Hired", value: "hired" },
  { label: "Rejected", value: "rejected" },
];

/**
 * ApplicantFilterTabs
 * Renders status filter pills/tabs to filter applicants.
 * Updates URL search parameters seamlessly.
 *
 * @param {{ currentStatus?: string }} props
 */
const ApplicantFilterTabs = ({ currentStatus = "all" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeStatus = (currentStatus || "all").toLowerCase();

  const handleSelectStatus = (statusValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!statusValue || statusValue.toLowerCase() === "all") {
      params.delete("status");
    } else {
      params.set("status", statusValue.toLowerCase());
    }

    // Reset to page 1 when filter changes
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary select-none">
      {STATUS_OPTIONS.map((item) => {
        const isActive = activeStatus === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => handleSelectStatus(item.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default ApplicantFilterTabs;
