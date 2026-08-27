"use client";

import { FiBriefcase, FiCheckCircle, FiUsers, FiUserCheck } from "react-icons/fi";

const RecruiterDashboardStatsGrid = ({ stats = {} }) => {
  const {
    totalJobPosts = 0,
    activeJobs = 0,
    totalApplications = 0,
    totalHired = 0,
  } = stats;

  const statItems = [
    {
      id: "total-jobs",
      label: "Total Job Posts",
      value: totalJobPosts,
      icon: FiBriefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "active-jobs",
      label: "Active Jobs",
      value: activeJobs,
      icon: FiCheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      id: "total-applications",
      label: "Total Applications",
      value: totalApplications,
      icon: FiUsers,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: "total-hired",
      label: "Total Hired",
      value: totalHired,
      icon: FiUserCheck,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/70"
          >
            <div>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-white text-2xl font-extrabold tracking-tight">
                {item.value.toLocaleString()}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center shrink-0`}
            >
              <Icon className={`size-6 ${item.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecruiterDashboardStatsGrid;
