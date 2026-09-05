import { getAdminDashboardData } from "@/lib/api/admin-api/AdminDashboard";
import AdminDashboardStatsGrid from "@/components/dashboard/admin-components/AdminDashboardStatsGrid";
import AdminDashboardAnalyticsCharts from "@/components/dashboard/admin-components/AdminDashboardAnalyticsCharts";
import AdminDashboardQuickActions from "@/components/dashboard/admin-components/AdminDashboardQuickActions";

/**
 * AdminDashboardHomePage — Server Component
 *
 * Responsibilities:
 *  1. Fetch overall platform statistics and 6-month analytics data from API.
 *  2. Render statistics overview grid cards.
 *  3. Render 6-month analytics charts for user growth & job posting activity.
 *  4. Provide direct quick actions to administrative management workflows.
 */
const AdminDashboardHomePage = async () => {
  // Fetch dashboard overview data from server API
  const dashboardData = await getAdminDashboardData();

  const stats = dashboardData?.stats ?? {
    totalUsers: 0,
    totalRecruiters: 0,
    totalActiveCompanies: 0,
    totalJobs: 0,
  };

  const analytics = dashboardData?.analytics ?? {
    newUsers: [],
    jobPosts: [],
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
          Admin Dashboard
        </h1>
        <p className="text-sm text-zinc-500">
          Overview of platform activity, user growth metrics, job postings, and key administrative actions.
        </p>
      </div>

      {/* ── Stats Summary Grid ────────────────────────────────────────────── */}
      <AdminDashboardStatsGrid stats={stats} />

      {/* ── Analytics Section ────────────────────────────────────────────── */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight mb-1">
          Platform Analytics
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Trends and performance data across user registrations and job creation activity.
        </p>
      </div>
      <AdminDashboardAnalyticsCharts analytics={analytics} />

      {/* ── Quick Actions Section ────────────────────────────────────────── */}
      <AdminDashboardQuickActions />
    </div>
  );
};

export default AdminDashboardHomePage;