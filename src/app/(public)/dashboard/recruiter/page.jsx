import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { getLoggedInUserSession } from "@/lib/core/Session";
import { getRecruiterDashboardData } from "@/lib/api/RecruiterDashboard";
import RecruiterDashboardStatsGrid from "@/components/dashboard/recruiter-components/RecruiterDashboardStatsGrid";
import RecruiterRecentApplicationsTable from "@/components/dashboard/recruiter-components/RecruiterRecentApplicationsTable";
import RecruiterCompanyOverviewCard from "@/components/dashboard/recruiter-components/RecruiterCompanyOverviewCard";

/**
 * RecruiterDashboardHomePage — Server Component
 * 
 * Responsibilities:
 *  1. Authenticate & retrieve logged-in recruiter session.
 *  2. Fetch recruiter stats, recent applications, and company data from backend API endpoint: `/dashboard/recruiter/:recruiterId`.
 *  3. Render stats grid at the top.
 *  4. Render 2-column split layout:
 *     - Left side: Recent Applications table (top 10 applications, no pagination needed).
 *     - Right side: Recruiter Company Overview card.
 */
const RecruiterDashboardHomePage = async () => {
  const user = await getLoggedInUserSession();

  // Fetch recruiter dashboard data from server API
  const dashboardResponse = await getRecruiterDashboardData(user?.id);

  // Extract metrics & objects with safe fallbacks
  const data = dashboardResponse?.data || dashboardResponse || {};
  const stats = data?.stats || {
    totalJobPosts: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalHired: 0,
  };
  const recentApplications = data?.recentApplications || [];
  const company = data?.company || null;

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1.5">
            Welcome back, {user?.name || "Recruiter"} 👋
          </h1>
          <p className="text-sm text-zinc-400">
            Here is an overview of your job postings, candidate applications, and company profile.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/dashboard/recruiter/jobs/new">
            <button className="flex items-center gap-2 bg-primary text-zinc-950 font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/25 text-sm">
              <FiPlusCircle className="size-4" />
              Post New Job
            </button>
          </Link>
        </div>
      </div>

      {/* ── Top Stats Grid ──────────────────────────────────────────────── */}
      <RecruiterDashboardStatsGrid stats={stats} />

      {/* ── Main Split Layout (Left: Applications Table, Right: Company Info) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Recent Applications Table */}
        <div className="lg:col-span-8">
          <RecruiterRecentApplicationsTable applications={recentApplications} />
        </div>

        {/* Right Column - Company Overview Card */}
        <div className="lg:col-span-4">
          <RecruiterCompanyOverviewCard company={company} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;