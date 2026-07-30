"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import { FiEdit2, FiUsers, FiPlusCircle, FiBriefcase } from "react-icons/fi";
import JobStatusSwitch from "./JobStatusSwitch";
import DeleteJobDialog from "./DeleteJobDialog";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Formats a date string into a relative time string (e.g., "3 days ago").
 * Falls back to "—" if the date is missing or invalid.
 */
const formatRelativeDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  } catch {
    return "—";
  }
};

// ─── Job Type Badge ───────────────────────────────────────────────────────────

const jobTypeColors = {
  "full-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "part-time": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  remote: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  contract: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  internship: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

const jobTypeLabels = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  remote: "Remote",
  contract: "Contract",
  internship: "Internship",
};

const JobTypeBadge = ({ type }) => {
  if (!type) return null;
  const key = type.toLowerCase();
  const cls = jobTypeColors[key] ?? "bg-zinc-700/30 text-zinc-400 border-zinc-700/40";
  const label = jobTypeLabels[key] ?? type;
  return (
    <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiBriefcase className="size-7 text-zinc-600" />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">No Job Posts Yet</h3>
    <p className="text-zinc-500 text-sm max-w-xs mb-6 leading-relaxed">
      You haven&apos;t posted any jobs yet. Create your first listing to start
      attracting candidates.
    </p>
    <Link href="/dashboard/recruiter/jobs/new">
      <button className="flex items-center gap-2 bg-primary text-zinc-950 font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/20">
        <FiPlusCircle className="size-4" />
        Post Your First Job
      </button>
    </Link>
  </div>
);

// ─── Pagination ───────────────────────────────────────────────────────────────

const JobsPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?page=${page}`);
  };

  // Build array: [1, '...', 4, 5, 6, '...', 12]
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="flex items-center justify-center py-4">
      <Pagination.Content className="flex items-center gap-1">
        {/* Previous */}
        <Pagination.Item>
          <Pagination.Previous
            onClick={() => goToPage(currentPage - 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === 1
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <Pagination.Item key={`ellipsis-${idx}`}>
              <Pagination.Ellipsis className="text-zinc-600 px-2 text-sm" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onClick={() => goToPage(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  p === currentPage
                    ? "bg-primary text-zinc-950 shadow-md shadow-primary/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        {/* Next */}
        <Pagination.Item>
          <Pagination.Next
            onClick={() => goToPage(currentPage + 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === totalPages
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
};

// ─── Main Table Component ─────────────────────────────────────────────────────

/**
 * RecruiterJobsTable
 * Client component — renders the full job management table.
 * Uses a plain <table> for full dark-theme control (avoids HeroUI Table
 * applying its own light-mode CSS).
 *
 * Sub-components split into separate files per the project convention:
 *   - JobStatusSwitch.jsx  — optimistic status toggle
 *   - DeleteJobDialog.jsx  — AlertDialog confirm + delete action
 *
 * @param {{ jobs: Array, totalJobs: number, currentPage: number, totalPages: number }} props
 */
const RecruiterJobsTable = ({
  jobs = [],
  totalJobs = 0,
  currentPage = 1,
  totalPages = 1,
}) => {
  if (!jobs.length) return <EmptyState />;

  return (
    <div className="space-y-4">
      {/* Results summary */}
      <p className="text-xs text-zinc-500 font-medium">
        Showing{" "}
        <span className="text-zinc-300 font-semibold">{jobs.length}</span> of{" "}
        <span className="text-zinc-300 font-semibold">{totalJobs}</span> job
        {totalJobs === 1 ? "" : "s"}
      </p>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      {/*
       * Using a plain <table> with explicit dark Tailwind classes.
       * HeroUI's Table compound applies its own light-mode default styles which
       * conflict with the app's dark-first design — this approach gives us full
       * control and matches the zinc/dark palette used across the dashboard.
       */}
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/60 bg-zinc-950/40">
        <table className="w-full text-left border-collapse">
          {/* ── Head ─────────────────────────────────────────────────────── */}
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Job Title
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Applicants
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Date Posted
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          {/* ── Body ─────────────────────────────────────────────────────── */}
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job._id}
                className={`group transition-colors duration-150 hover:bg-zinc-900/50 ${
                  index !== jobs.length - 1 ? "border-b border-zinc-800/40" : ""
                }`}
              >
                {/* Job Title + Category + Type + Location */}
                <td className="px-5 py-4 min-w-55">
                  <div className="space-y-1.5">
                    <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors duration-200">
                      {job.jobTitle || "—"}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {job.jobCategory ? (
                        <span className="text-[10px] text-zinc-500 font-medium">
                          {job.jobCategory}
                        </span>
                      ) : null}
                      <JobTypeBadge type={job.jobType} />
                    </div>
                    {job.location ? (
                      <p className="text-[11px] text-zinc-600">{job.location}</p>
                    ) : null}
                  </div>
                </td>

                {/* Status toggle — JobStatusSwitch handles optimistic updates */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <JobStatusSwitch job={job} />
                </td>

                {/* Applicants count */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {job.applicationCount != null ? job.applicationCount : "—"}
                    </span>
                    {job.applicationCount != null && job.applicationCount > 0 && (
                      <span className="text-[10px] text-zinc-500">
                        {job.applicationCount === 1 ? "applicant" : "applicants"}
                      </span>
                    )}
                  </div>
                </td>

                {/* Date posted */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="text-sm text-zinc-400">
                    {formatRelativeDate(job.createdAt)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit — navigates to edit page (implementation deferred) */}
                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                      id={`edit-job-${job._id}`}
                      title="Edit job"
                      className="p-2 rounded-lg text-zinc-500 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    >
                      <FiEdit2 className="size-4" />
                    </Link>

                    {/* View Applicants — navigates to applicants page (implementation deferred) */}
                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}/applicants`}
                      id={`view-applicants-${job._id}`}
                      title="View applicants"
                      className="p-2 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                    >
                      <FiUsers className="size-4" />
                    </Link>

                    {/* Delete — opens AlertDialog confirmation */}
                    <DeleteJobDialog job={job} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────────────────────────────────── */}
      <JobsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default RecruiterJobsTable;
