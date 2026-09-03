import { getAdminJobs } from "@/lib/api/admin-api/AdminJob";
import AdminJobsStatsStrip from "@/components/dashboard/admin-components/AdminJobsStatsStrip";
import AdminJobsSearchFilter from "@/components/dashboard/admin-components/AdminJobsSearchFilter";
import AdminJobsTable from "@/components/dashboard/admin-components/AdminJobsTable";

/**
 * AdminManageJobsPage — Server Component
 *
 * Responsibilities:
 *  1. Read searchParams (`search`, `status`, `page`) from URL query.
 *  2. Fetch jobs, stats, and pagination metadata from `/admin/jobs` API.
 *  3. Render stats strip, search & filter controls, and paginated jobs table with actions.
 */
const AdminManageJobsPage = async ({ searchParams }) => {
  const { search = "", status = "all", page = "1" } = (await searchParams) || {};
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Fetch jobs data from server API
  const response = await getAdminJobs(search, status, currentPage);

  const jobs = response?.jobs ?? [];
  const stats = response?.stats ?? {
    totalJobPost: 0,
    totalActiveJobs: 0,
    totalClosedJobs: 0,
    lastMonthPostedJobs: 0,
  };
  const pagination = response?.pagination ?? {
    currentPage: 1,
    limit: 10,
    totalJobs: jobs.length,
    totalPages: 1,
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
          Manage Jobs
        </h1>
        <p className="text-sm text-zinc-500">
          Monitor, filter, and manage all job postings submitted across the platform.
        </p>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <AdminJobsStatsStrip stats={stats} />

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900 mb-6" />

      {/* ── Search & Status Filter Controls (Client Component) ───────────── */}
      <AdminJobsSearchFilter
        currentSearch={search}
        currentStatus={status}
      />

      {/* ── Jobs Table & Pagination (Client Component) ─────────────── */}
      <AdminJobsTable
        jobs={jobs}
        totalJobs={pagination.totalJobs ?? jobs.length}
        currentPage={pagination.currentPage ?? currentPage}
        totalPages={pagination.totalPages ?? 1}
        currentSearch={search}
        currentStatus={status}
      />
    </div>
  );
};

export default AdminManageJobsPage;