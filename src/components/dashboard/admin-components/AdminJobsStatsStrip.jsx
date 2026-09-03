"use client";

import { FiBriefcase, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

/**
 * AdminJobsStatsStrip
 * Renders 4 statistics summary cards in a responsive grid layout.
 *
 * @param {{ stats: { totalJobPost: number, totalActiveJobs: number, totalClosedJobs: number, lastMonthPostedJobs: number } }} props
 */
const AdminJobsStatsStrip = ({ stats = {} }) => {
  const {
    totalJobPost = 0,
    totalActiveJobs = 0,
    totalClosedJobs = 0,
    lastMonthPostedJobs = 0,
  } = stats || {};

  const statCards = [
    {
      id: "total-jobs",
      title: "Total Job Posts",
      value: totalJobPost,
      icon: FiBriefcase,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: totalActiveJobs,
      icon: FiCheckCircle,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      id: "closed-jobs",
      title: "Closed Jobs",
      value: totalClosedJobs,
      icon: FiXCircle,
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    {
      id: "last-month-posted",
      title: "Posted Last Month",
      value: lastMonthPostedJobs,
      icon: FiClock,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800/60
              hover:border-zinc-700/80 transition-all duration-200 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {card.title}
              </p>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {card.value}
              </h3>
            </div>
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.iconBg}`}
            >
              <IconComponent className="size-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminJobsStatsStrip;
