"use client";

import {
  FiDollarSign,
  FiBriefcase,
  FiTrendingUp,
  FiMapPin,
} from "react-icons/fi";

/**
 * Formats salary values into readable currency labels
 */
const formatSalary = (min, max, currency = "USD") => {
  if (!min && !max) return "Not specified";
  const symbol = currency === "USD" ? "$" : currency + " ";

  const formatNum = (num) => {
    if (!num && num !== 0) return "";
    return num >= 1000 ? `${(num / 1000).toLocaleString()}k` : num.toString();
  };

  if (min && max) {
    return `${symbol}${formatNum(min)} – ${symbol}${formatNum(max)} / month`;
  }
  if (min) return `From ${symbol}${formatNum(min)} / month`;
  return `Up to ${symbol}${formatNum(max)} / month`;
};

/**
 * Formats job type slug e.g. "full-time" -> "Full-time"
 */
const formatJobType = (type) => {
  if (!type) return "N/A";
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

export default function JobOverviewGrid({ job }) {
  if (!job) return null;

  const {
    salaryMin,
    salaryMax,
    currency,
    jobType,
    experienceLevel,
    location,
    isRemote,
  } = job;

  const salaryFormatted = formatSalary(salaryMin, salaryMax, currency);
  const locationLabel = [location, isRemote ? "(Remote)" : null]
    .filter(Boolean)
    .join(" ");

  const overviewItems = [
    {
      id: "salary",
      label: "Offered Salary",
      value: salaryFormatted,
      icon: FiDollarSign,
      color: "text-emerald-400 bg-emerald-950/50 border-emerald-900/50",
    },
    {
      id: "jobType",
      label: "Job Type",
      value: formatJobType(jobType),
      icon: FiBriefcase,
      color: "text-blue-400 bg-blue-950/50 border-blue-900/50",
    },
    {
      id: "experience",
      label: "Experience Level",
      value: experienceLevel || "Not specified",
      icon: FiTrendingUp,
      color: "text-amber-400 bg-amber-950/50 border-amber-900/50",
    },
    {
      id: "location",
      label: "Location",
      value: locationLabel || "Remote",
      icon: FiMapPin,
      color: "text-purple-400 bg-purple-950/50 border-purple-900/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:border-zinc-700/80"
          >
            <div
              className={`p-3 rounded-xl border ${item.color} shrink-0 flex items-center justify-center`}
            >
              <Icon className="text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-zinc-100 mt-1 truncate">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
