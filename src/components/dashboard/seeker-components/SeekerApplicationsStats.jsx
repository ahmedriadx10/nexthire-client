"use client";

import { FiSend, FiStar, FiCalendar, FiTrendingUp } from "react-icons/fi";

/**
 * SeekerApplicationsStats Component
 * Renders grid row displaying application metrics for the job seeker.
 *
 * @param {Object} props
 * @param {Object} props.stats - Stats object { totalApplied, totalShortlisted, totalInterview, successRate }
 */
const SeekerApplicationsStats = ({ stats = {} }) => {
  const {
    totalApplied = 0,
    totalShortlisted = 0,
    totalInterview = 0,
    successRate = 0,
  } = stats || {};

  const statItems = [
    {
      id: "totalApplied",
      label: "Total Applied",
      value: totalApplied,
      icon: FiSend,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "totalShortlisted",
      label: "Total Shortlisted",
      value: totalShortlisted,
      icon: FiStar,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "totalInterview",
      label: "Total Interview",
      value: totalInterview,
      icon: FiCalendar,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "successRate",
      label: "Success Rate",
      value: `${successRate && successRate.toFixed(2)}%`,
      icon: FiTrendingUp,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/40"
          >
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {item.value}
              </h3>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}
            >
              <Icon className="size-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeekerApplicationsStats;
