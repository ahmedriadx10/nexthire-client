"use client";

import { FiBookmark, FiSend, FiCalendar, FiXCircle } from "react-icons/fi";

/**
 * SeekerDashboardStatsGrid — Client Component
 *
 * Renders a 4-card responsive stats grid for the seeker dashboard home.
 *
 * @param {Object} props
 * @param {Object} props.stats - { totalSavedJobs, totalApplications, totalInterview, totalRejected }
 */
const SeekerDashboardStatsGrid = ({ stats = {} }) => {
  const {
    totalSavedJobs = 0,
    totalApplications = 0,
    totalInterview = 0,
    totalRejected = 0,
  } = stats || {};

  const statItems = [
    {
      id: "totalSavedJobs",
      label: "Saved Jobs",
      value: totalSavedJobs,
      icon: FiBookmark,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "totalApplications",
      label: "Applications",
      value: totalApplications,
      icon: FiSend,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "totalInterview",
      label: "Interviews",
      value: totalInterview,
      icon: FiCalendar,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "totalRejected",
      label: "Rejected",
      value: totalRejected,
      icon: FiXCircle,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/40 hover:scale-[1.01]"
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

export default SeekerDashboardStatsGrid;
