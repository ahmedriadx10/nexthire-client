import Link from "next/link";
import { FiArrowLeft, FiBriefcase, FiUsers, FiMapPin } from "react-icons/fi";
import { getRecruiterJobApplicants } from "@/lib/api/RecruiterApplicants";
import { getRecruiterJobById } from "@/lib/api/RecruiterJob";
import RecruiterJobApplicantsTable from "@/components/dashboard/recruiter-components/RecruiterJobApplicantsTable";

/**
 * RecruiterJobPostApplicatsViewPage - Server Component
 *
 * Displays a paginated, filterable table of all job seekers who applied to a specific job post.
 * Allows recruiters to view candidate details, resume links, cover messages, and update application statuses.
 */
const RecruiterJobPostApplicatsViewPage = async ({ params, searchParams }) => {
  // Next.js 16: params and searchParams are Promises — must be awaited
  const { jobId } = await params;
  const { status = "all", page = "1" } = await searchParams;

  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Fetch job details and job applicants concurrently
  const [jobRes, applicantsRes] = await Promise.all([
    getRecruiterJobById(jobId).catch(() => null),
    getRecruiterJobApplicants(jobId, { status, page: currentPage }).catch(() => null),
  ]);

  const job = jobRes?.job || jobRes?.data || null;

  const applications = applicantsRes?.data?.applications ?? applicantsRes?.applications ?? [];
  const pagination = applicantsRes?.data?.pagination ?? applicantsRes?.pagination ?? {
    currentPage: 1,
    totalApplications: applications.length,
    totalPages: 1,
  };

  const jobTitle = job?.jobTitle || (applications[0]?.jobName) || "Job Applicants";
  const jobCategory = job?.jobCategory || "";
  const jobLocation = job?.location || "";
  const jobType = job?.jobType || "";

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">
      {/* ── Top Back Button Navigation ────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <FiArrowLeft className="size-4" />
          <span>Back to Manage Jobs</span>
        </Link>
      </div>

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
              {jobTitle}
            </h1>
            {jobType && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {jobType}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 flex items-center gap-3 flex-wrap">
            {jobCategory && (
              <span className="flex items-center gap-1">
                <FiBriefcase className="size-3 text-zinc-500" />
                {jobCategory}
              </span>
            )}
            {jobLocation && (
              <span className="flex items-center gap-1">
                <FiMapPin className="size-3 text-zinc-500" />
                {jobLocation}
              </span>
            )}
          </p>
        </div>

        {/* Total Applications Counter Badge */}
        <div className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2.5 rounded-xl shrink-0 self-start md:self-auto">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <FiUsers className="size-4" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              Total Applicants
            </p>
            <p className="text-sm font-extrabold text-white">
              {pagination.totalApplications ?? applications.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Applicants Table Component (Client Component) ────────────────── */}
      <RecruiterJobApplicantsTable
        applications={applications}
        pagination={pagination}
        currentStatus={status}
        defaultJobTitle={jobTitle}
      />
    </div>
  );
};

export default RecruiterJobPostApplicatsViewPage;
