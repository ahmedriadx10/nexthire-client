import { getBrowseJobs } from "@/lib/api/public-api/jobs";
import SearchBar from "@/components/browse-jobs/SearchBar";
import FilterSidebar from "@/components/browse-jobs/FilterSidebar";
import SortSelect from "@/components/browse-jobs/SortSelect";
import JobList from "@/components/browse-jobs/JobList";
import Pagination from "@/components/browse-jobs/Pagination";


// BUG!
/**
 * When user via mobile device the screen overflow cause our filter container and joblist are horizontally available on mobile device as a result it overflows 
 * 
 * FIX : in mobile device filter container and jobList container will be vertical after md: the can be horizontal that means flex-row
 */


export const metadata = {
  title: "Browse Jobs | NextHire",
  description:
    "Search and filter thousands of professional jobs. Find your next opportunity by role, type, salary, and more.",
};

/**
 * BrowseJobsPage — async Server Component.
 *
 * Reads URL search-params (searchParams prop is a Promise in Next.js 16).
 * Fetches jobs server-side and passes data down to client sub-components.
 *
 * URL param schema:
 *   search        string          keyword search
 *   jobType       string[]        full-time | part-time | contract | internship | remote
 *   sortBy        string          newest (default) | oldest | salary-high | salary-low
 *   postedWithin  string          all-time (default) | l24h | l7d | l30d
 *   page          number          default 1
 */
const BrowseJobsPage = async ({ searchParams }) => {
  // searchParams is a Promise in Next.js 16 — must be awaited
  const resolvedParams = await searchParams;

  const {
    search = "",
    jobType,
    sortBy = "newest",
    postedWithin = "all-time",
    page = "1",
  } = resolvedParams;

  const { jobs, pagination, permission } = await getBrowseJobs({
    search,
    jobType,
    sortBy,
    postedWithin,
    page,
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Search bar */}
        <SearchBar />

        {/* Body: sidebar + listings */}
        <div className="flex gap-5 items-start">

          {/* Filter sidebar */}
          <div className="w-52 shrink-0 sticky top-6">
            <FilterSidebar />
          </div>

          {/* Job listings */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Listings header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                Found{" "}
                <span className="text-white">
                  {pagination.totalJobs.toLocaleString()}
                </span>{" "}
                Professional Jobs
              </h1>
              <SortSelect />
            </div>

            {/* Job cards */}
            <JobList jobs={jobs} permission={permission} />

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrowseJobsPage;
