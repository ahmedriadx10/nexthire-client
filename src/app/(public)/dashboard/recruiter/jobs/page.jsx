import Link from "next/link";
import { FiPlusCircle, FiLayers } from "react-icons/fi";
import { getLoggedInUserSession } from "@/lib/core/Session";
import { getRecruiterJobs } from "@/lib/api/RecruiterJob";
import RecruiterJobsTable from "@/components/dashboard/recruiter-components/RecruiterJobsTable";

// Number of jobs fetched per page — matches backend pagination config
const JOBS_PER_PAGE = 10;

/**
 * RecruiterManageJobsPage — Server Component
 *
 * Responsibilities:
 *  1. Read the `?page` query param from the incoming request (searchParams prop).
 *  2. Get the logged-in recruiter's session.
 *  3. Fetch the recruiter's paginated job posts from the API.
 *  4. Pass the data to the client-side <RecruiterJobsTable /> for interactivity.
 *
 * Table of all job posts created by the Recruiter.
 * Table would be imported from heroUI tables
 *
 * Columns: Job Title, Status (Active / Closed ), Applicants Count, Date Posted.
 * Action buttons per row: Edit, View Applicants, Close/Reopen, Delete (with confirmation).
 * I have implemented server side pagination just have to use pagination in client side
 * server will receive page number as a query parameter exmp: ?page=1
 * for pagination you can use heroUI pagination component and pass the page number to the server via query
 * to load recruiter jobs data this is the api (/recruiter/jobs/:recruiterId)
 *
 * Special Note: RecruiterManageJobsPage is the server component and RecruiterJobsTable
 * is the child client component managing the table.
 *
 * Action button Flow
 * Edit or Job status change Close/Active would be a patch request to the backend and should
 * use one api and on server action function:
 *   updateJobStatusOrDetails(jobId, {status: "closed"})
 *   updateJobStatusOrDetails(jobId, {title: "New Title", description: "Updated description", etc})
 * Edit Job post will navigate the edit page via Link and then the specific job data will be loaded
 * and pre-filled form will be shown to the recruiter for editing.
 * (Now you don't need to work on the edit page just you have to navigate to the edit page
 * and then we will work on the edit page later.)
 * status change close/active button would be a switch imported from heroUI
 *
 * View Applications would be a Link component
 * (NB: just have to navigate like now we will work on the view applications page later)
 *
 * Application Delete action would be a different API and with confirmation modal
 * which would be imported from heroUI modal or alert
 *
 * NOTE: If any kind of thing you wanna know about the implementation of this page
 * please ask me i will explain you in detail.
 *
 * TODO (Future Task — Plan Feature):
 * A plan usage indicator showing active job posts used vs. allowed (e.g., 7 / 10).
 * Mark it for future task when the plan feature is implemented.
 * A "Post New Job" button at the top navigating to the Add Job page
 * (disabled once the plan's active job limit is reached).
 */
const RecruiterManageJobsPage = async ({ searchParams }) => {
  // Next.js 16: searchParams is a Promise — must be awaited
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Get logged-in recruiter from session
  const user = await getLoggedInUserSession();

  // Fetch paginated job posts from the backend API
  const data = await getRecruiterJobs(user?.id, currentPage);
  const jobs = data?.jobs ?? [];
  const totalJobs = data?.totalJobs ?? 0;
  const activeJobs=data?.activeJobs ?? 0;
  const closedJobs=data?.closedJobs ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        {/* Title block */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
            Manage Jobs
          </h1>
          <p className="text-sm text-zinc-500">
            Review, edit, and manage all your job listings in one place.
          </p>
        </div>

        {/* CTA + Plan indicator row */}
        <div className="flex items-center gap-3 shrink-0">

          {/*
           * TODO (Future Task — Plan Feature):
           * Plan usage indicator — uncomment and wire to real plan data
           * once the subscription/plan feature is implemented.
           *
           * <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/60
           *   px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400">
           *   <FiLayers className="size-3.5 text-zinc-500" />
           *   <span>
           *     <span className="text-white font-bold">–</span>
           *     {" / –"}
           *   </span>
           *   <span className="text-zinc-600">active jobs used</span>
           * </div>
           */}

          {/* Post New Job button — will be disabled when plan limit is reached (future) */}
          <Link href="/dashboard/recruiter/jobs/new" id="post-new-job-btn">
            <button className="flex items-center gap-2 bg-primary text-zinc-950 font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/25 text-sm">
              <FiPlusCircle className="size-4" />
              Post New Job
            </button>
          </Link>
        </div>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl flex-1 min-w-35">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            Total Jobs
          </p>
          <p className="text-white text-xl font-extrabold">{totalJobs}</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl flex-1 min-w-35">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            Active
          </p>
          <p className="text-emerald-400 text-xl font-extrabold">
            {activeJobs}
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl flex-1 min-w-35">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            Closed
          </p>
          <p className="text-zinc-400 text-xl font-extrabold">
            {closedJobs}
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl flex-1 min-w-35">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            Total Applicants
          </p>
          <p className="text-white text-xl font-extrabold">
            {jobs.reduce((sum, j) => sum + (j.applicationCount ?? 0), 0)}
          </p>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900 mb-8" />

      {/* ── Jobs Table (Client Component) ────────────────────────────────── */}
      <RecruiterJobsTable
        jobs={jobs}
        totalJobs={totalJobs}
        currentPage={currentPage}
        totalPages={totalPages}
      />

    </div>
  );
};

export default RecruiterManageJobsPage;
