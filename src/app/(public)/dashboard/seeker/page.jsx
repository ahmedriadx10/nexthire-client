import Link from "next/link";
import { FiSearch, FiUser } from "react-icons/fi";
import { getLoggedInUserSession } from "@/lib/core/Session";
import { getSeekerDashboardData } from "@/lib/api/SeekerDashboard";
import SeekerDashboardStatsGrid from "@/components/dashboard/seeker-components/SeekerDashboardStatsGrid";
import SeekerLatestApplications from "@/components/dashboard/seeker-components/SeekerLatestApplications";
import SeekerLatestJobs from "@/components/dashboard/seeker-components/SeekerLatestJobs";
import SeekerProfileCard from "@/components/dashboard/seeker-components/SeekerProfileCard";

/**
 * SeekerDashboardHomePage — Server Component
 *
 * Responsibilities:
 *  1. Authenticate & retrieve the logged-in seeker's session.
 *  2. Fetch dashboard data from backend API: /dashboard/seeker/:seekerId
 *     Response shape: { stats, latestJobs, latestApplications, profile }
 *  3. Render:
 *     - Page header with greeting & quick-action buttons.
 *     - Top stats grid (4 metric cards).
 *     - Main split layout:
 *         Left (8 cols): Latest Applications + Latest Jobs.
 *         Right (4 cols): Seeker Profile Card.
 */
const SeekerDashboardHomePage = async () => {
  // ── 1. Auth ────────────────────────────────────────────────────────────────
  const user = await getLoggedInUserSession();

  // ── 2. Fetch dashboard data ────────────────────────────────────────────────
  const dashboardResponse = await getSeekerDashboardData(user?.id);

  // Safe-extract with fallbacks
  const data = dashboardResponse?.data || dashboardResponse || {};

  const stats = data?.stats || {
    totalSavedJobs: 0,
    totalApplications: 0,
    totalInterview: 0,
    totalRejected: 0,
  };

  const latestJobs = Array.isArray(data?.latestJobs) ? data.latestJobs : [];
  const latestApplications = Array.isArray(data?.latestApplications)
    ? data.latestApplications
    : [];
  const profile = data?.profile || null;
  const seekerId = profile?.seekerId || user?.id || null;

  // ── 3. Render ──────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1.5">
            Welcome back, {user?.name || "Seeker"} 👋
          </h1>
          <p className="text-sm text-zinc-400">
            Track your saved jobs, applications, and discover the latest
            opportunities.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/browse-jobs">
            <button className="flex items-center gap-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 text-sm cursor-pointer">
              <FiSearch className="size-4" />
              Browse Jobs
            </button>
          </Link>
          <Link href="/dashboard/seeker/settings">
            <button className="flex items-center gap-2 bg-primary text-zinc-950 font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/25 text-sm">
              <FiUser className="size-4" />
              My Profile
            </button>
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────────────────────── */}
      <SeekerDashboardStatsGrid stats={stats} />

      {/* ── Main Split Layout ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start mt-8">
        {/* ── Left Column: Applications + Jobs ── */}
        <div className="xl:col-span-7 2xl:col-span-8 flex flex-col gap-8">
          {/* Latest Applications */}
          <SeekerLatestApplications applications={latestApplications} />

          {/* Latest Jobs */}
          <SeekerLatestJobs jobs={latestJobs} />
        </div>

        {/* ── Right Column: Profile Overview ── */}
        <div className="xl:col-span-5 2xl:col-span-4">
          <SeekerProfileCard seekerId={seekerId} seekerProfile={profile} />
        </div>
      </div>
</div>
  )
};

export default SeekerDashboardHomePage;