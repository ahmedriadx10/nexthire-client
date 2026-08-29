import { getLoggedInUserSession } from "@/lib/core/Session";
import { getSeekerSavedJobs } from "@/lib/actions/seeker-action/savedJobActions";
import SeekerSavedJobsTable from "@/components/dashboard/seeker-components/SeekerSavedJobsTable";

const SAVED_JOBS_PER_PAGE=10

/**
 * SeekerSavedJobsPage — Server Component
 *
 * Responsibilities:
 *  1. Read searchParams (`?page` and `?search`).
 *  2. Retrieve logged-in seeker session.
 *  3. Fetch paginated saved jobs from the backend API.
 *  4. Pass data to client-side SeekerSavedJobsTable component.
 */
const SeekerSavedJobsPage = async ({ searchParams }) => {
  // Next.js 16: searchParams is a Promise — must be awaited
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page ?? "1";
  const search = resolvedSearchParams?.search ?? "";

  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Get logged-in seeker user session
  const user = await getLoggedInUserSession();

  // Fetch paginated saved jobs from backend API
  const response = await getSeekerSavedJobs({
    userId: user?.id,
    page: currentPage,
    search,
  });

  const savedJobs = response?.data ?? [];
  const pagination = response?.pagination ?? {};
  const totalSaved = pagination?.total ?? savedJobs.length;
  const totalPages = pagination?.totalPages ?? Math.max(1, Math.ceil(totalSaved / SAVED_JOBS_PER_PAGE));


  return (
    <div className="max-w-6xl mx-auto pb-12 select-none space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1.5">
            Saved Jobs
          </h1>
          <p className="text-sm text-zinc-400">
            View, search, and manage all your bookmarked job listings.
          </p>
        </div>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
 

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900" />

      {/* ── Saved Jobs Table (Client Component) ─────────────────────────── */}
      <SeekerSavedJobsTable
        savedJobs={savedJobs}
        totalSaved={totalSaved}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={search}
        userId={user?.id}
      />
    </div>
  );
};

export default SeekerSavedJobsPage;