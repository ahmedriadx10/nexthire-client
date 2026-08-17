"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { ChevronDown } from "lucide-react"; // replace lucide react icons via react icons

const SORT_OPTIONS = [
  { value: "newest", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
];

const POSTED_WITHIN_OPTIONS = [
  { value: "all-time", label: "All Time" },
  { value: "l24h", label: "Last 24 Hours" },
  { value: "l7d", label: "Last 7 Days" },
  { value: "l30d", label: "Last 30 Days" },
];

const NativeSelect = ({ value, onChange, options, label }) => (
  <div className="relative flex items-center gap-2">
    <span className="text-sm text-zinc-400 shrink-0">{label}</span>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-xl pl-3 pr-8 py-1.5 cursor-pointer hover:bg-zinc-700 hover:border-zinc-600 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-500"
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v} className="bg-zinc-900 text-zinc-200">
            {l}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
      />
    </div>
  </div>
);

const SortSelect = () => {
  const { searchParams, setParam } = useQueryParams();

  const sortBy = searchParams.get("sortBy") || "newest";
  const postedWithin = searchParams.get("postedWithin") || "all-time";

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <NativeSelect
        label="Sort by:"
        value={sortBy}
        onChange={(v) => setParam("sortBy", v)}
        options={SORT_OPTIONS}
      />
      <NativeSelect
        label="Posted:"
        value={postedWithin}
        onChange={(v) => setParam("postedWithin", v)}
        options={POSTED_WITHIN_OPTIONS}
      />
    </div>
  );
};

export default SortSelect;
