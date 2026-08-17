"use client";

import { useQueryParams } from "@/hooks/useQueryParams";

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

/**
 * Custom checkbox component — avoids HeroUI v3 React Aria Checkbox compound API.
 * Matches the dark-theme mockup style.
 */
const FilterCheckbox = ({ value, label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div
      className={[
        "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors duration-150",
        checked
          ? "bg-white border-white"
          : "bg-transparent border-zinc-600 group-hover:border-zinc-400",
      ].join(" ")}
    >
      {checked && (
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          className="text-zinc-900"
        >
          <path
            d="M1 3.5L3.5 6L8 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="sr-only"
    />
    <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors duration-150">
      {label}
    </span>
  </label>
);

const FilterSidebar = () => {
  const { searchParams, setMultiParam } = useQueryParams();
  const activeJobTypes = searchParams.getAll("jobType");

  const handleToggle = (value) => {
    const next = activeJobTypes.includes(value)
      ? activeJobTypes.filter((v) => v !== value)
      : [...activeJobTypes, value];
    setMultiParam("jobType", next);
  };

  const handleClear = () => setMultiParam("jobType", []);

  return (
    <aside className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
          Filters
        </h2>
        {activeJobTypes.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          Job Type
        </h3>
        <div className="flex flex-col gap-2.5">
          {JOB_TYPES.map(({ value, label }) => (
            <FilterCheckbox
              key={value}
              value={value}
              label={label}
              checked={activeJobTypes.includes(value)}
              onChange={handleToggle}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
