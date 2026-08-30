import { getLoggedInUserSession } from "@/lib/core/Session";
import { getSeekerApplications } from "@/lib/actions/seeker-action/seekerApplicationActions";
import SeekerApplicationsStats from "@/components/dashboard/seeker-components/SeekerApplicationsStats";
import SeekerApplicationsTable from "@/components/dashboard/seeker-components/SeekerApplicationsTable";

/**
 * SeekerMyApplicationsPage — Server Component
 *
 * Responsibilities:
 *  1. Read searchParams (`?page`, `?search`, `?status`).
 *  2. Retrieve logged-in seeker user session.
 *  3. Fetch applications & stats from backend API.
 *  4. Render stats row and applications table.
 */
const SeekerMyApplicationsPage = async ({ searchParams }) => {
  // Next.js 16: searchParams is a Promise — must be awaited
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page ?? "1";
  const search = resolvedSearchParams?.search ?? "";
  const status = resolvedSearchParams?.status ?? "";

  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Retrieve logged-in seeker session
  const user = await getLoggedInUserSession();

  // Fetch applications data & stats from server
  const response = await getSeekerApplications({
    seekerId: user?.id,
    page: currentPage,
    search,
    status,
  });

  const responseData = response?.data ?? {};
  const stats = responseData?.stats ?? {
    totalApplied: 0,
    totalShortlisted: 0,
    totalInterview: 0,
    successRate: 0,
  };
  const applications = responseData?.applications ?? [];
  const pagination = responseData?.pagination ?? {};

  const totalApplications = pagination?.totalApplications ?? applications.length;
  const totalPages =
    pagination?.totalPages ?? Math.max(1, Math.ceil(totalApplications / (pagination?.limit || 10)));

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1.5">
            My Applications
          </h1>
          <p className="text-sm text-zinc-400">
            Track, manage, and inspect all your submitted job applications.
          </p>
        </div>
      </div>

      {/* ── Stats Grid Row ──────────────────────────────────────────────── */}
      <SeekerApplicationsStats stats={stats} />

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900" />

      {/* ── Applications Table (Client Component) ───────────────────────── */}
      <SeekerApplicationsTable
        applications={applications}
        totalApplications={totalApplications}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={search}
        statusQuery={status}
      />
    </div>
  );
};

export default SeekerMyApplicationsPage;
