import Link from "next/link";
import { FiUsers, FiBriefcase, FiDollarSign, FiSettings, FiArrowRight } from "react-icons/fi";
import { PiBuildingsBold } from "react-icons/pi";

/**
 * AdminDashboardQuickActions
 * Renders quick navigation actions for key admin sections.
 */
const AdminDashboardQuickActions = () => {
  const actions = [
    {
      title: "Manage Users",
      description: "View accounts, edit roles, and suspend or activate users.",
      href: "/dashboard/admin/users",
      icon: FiUsers,
      color: "text-blue-400",
      bgHover: "hover:border-blue-500/40",
    },
    {
      title: "Manage Companies",
      description: "Review, approve, or reject company registration requests.",
      href: "/dashboard/admin/companies",
      icon: PiBuildingsBold,
      color: "text-amber-400",
      bgHover: "hover:border-amber-500/40",
    },
    {
      title: "Manage Jobs",
      description: "Inspect live and closed job listings across all categories.",
      href: "/dashboard/admin/jobs",
      icon: FiBriefcase,
      color: "text-purple-400",
      bgHover: "hover:border-purple-500/40",
    },
    {
      title: "Payments & Subscriptions",
      description: "Track platform transactions, revenue, and active plans.",
      href: "/dashboard/admin/payments",
      icon: FiDollarSign,
      color: "text-emerald-400",
      bgHover: "hover:border-emerald-500/40",
    },
  ];

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Quick Administration Actions
          </h3>
          <p className="text-xs text-zinc-500">
            Direct shortcuts to manage core platform entities and settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const IconComp = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group flex flex-col justify-between p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl transition-all duration-200 ${action.bgHover} hover:bg-zinc-800/30`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-zinc-800/80 ${action.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <FiArrowRight className="w-4 h-4 text-zinc-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardQuickActions;
