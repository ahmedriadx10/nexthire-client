import { FiUsers, FiUserCheck, FiFileText } from "react-icons/fi";
import { PiBuildingsBold } from "react-icons/pi";

/**
 * AdminDashboardStatsGrid
 * Displays key platform overview statistics in a responsive grid.
 *
 * @param {{ stats: { totalUsers: number, totalRecruiters: number, totalActiveCompanies: number, totalJobs: number } }} props
 */
const AdminDashboardStatsGrid = ({ stats = {} }) => {
  const {
    totalUsers = 0,
    totalRecruiters = 0,
    totalActiveCompanies = 0,
    totalJobs = 0,
  } = stats;

  const statItems = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      valueColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Total Recruiters",
      value: totalRecruiters,
      icon: FiUserCheck,
      valueColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Active Companies",
      value: totalActiveCompanies,
      icon: PiBuildingsBold,
      valueColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: FiFileText,
      valueColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.title}
            className="relative overflow-hidden bg-zinc-900/50 border border-zinc-800/70 p-5 rounded-2xl transition-all duration-200 hover:border-zinc-700/80 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.title}
                </p>
                <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${item.valueColor}`}>
                  {item.value.toLocaleString()}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
              >
                <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboardStatsGrid;
