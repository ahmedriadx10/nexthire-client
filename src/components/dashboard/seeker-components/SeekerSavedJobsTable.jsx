"use client";

import Link from "next/link";
import { FiBookmark, FiSend, FiSearch, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import SavedJobSearch from "./SavedJobSearch";
import SavedJobPagination from "./SavedJobPagination";
import DeleteSavedJobDialog from "./DeleteSavedJobDialog";

/**
 * Formats a date string into a relative time string.
 */
const formatRelativeDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "just now";
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

/**
 * Empty state component when no saved jobs are found.
 */
const EmptyState = ({ searchActive = false }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-zinc-800/60 rounded-2xl bg-zinc-950/40">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiBookmark className="size-7 text-zinc-600" />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">
      {searchActive ? "No Saved Jobs Found" : "No Saved Jobs Yet"}
    </h3>
    <p className="text-zinc-500 text-sm max-w-xs mb-6 leading-relaxed">
      {searchActive
        ? "No saved jobs matched your search criteria. Try a different search query."
        : "You haven't bookmarked any jobs yet. Browse listings and save the ones you are interested in."}
    </p>
    {!searchActive && (
      <Link href="/browse-jobs">
        <button className="flex items-center gap-2 bg-primary text-zinc-950 font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/20 text-sm">
          <FiSearch className="size-4" />
          Browse Available Jobs
        </button>
      </Link>
    )}
  </div>
);

/**
 * SeekerSavedJobsTable Component
 *
 * @param {Object} props
 * @param {Array} props.savedJobs - Array of saved job objects from backend.
 * @param {number} props.totalSaved - Total number of saved jobs.
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total pages count.
 * @param {string} props.searchQuery - Current search query term.
 * @param {string} props.userId - Current logged-in user ID.
 */
const SeekerSavedJobsTable = ({
  savedJobs = [],
  totalSaved = 0,
  currentPage = 1,
  totalPages = 1,
  searchQuery = "",
  userId = "",
}) => {
  const hasJobs = savedJobs && savedJobs.length > 0;

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Search & Results Summary ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SavedJobSearch initialSearch={searchQuery} />

        <p className="text-xs text-zinc-500 font-medium shrink-0">
          Showing{" "}
          <span className="text-zinc-300 font-semibold">{savedJobs.length}</span> of{" "}
          <span className="text-zinc-300 font-semibold">{totalSaved}</span> saved job
          {totalSaved === 1 ? "" : "s"}
        </p>
      </div>

      {/* ── Content: Empty State or Table ─────────────────────────────── */}
      {!hasJobs ? (
        <EmptyState searchActive={Boolean(searchQuery)} />
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/60 bg-zinc-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60">
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Job & Company
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Timeline
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {savedJobs.map((item, index) => {
                const {
                  _id,
                  jobId,
                  jobName,
                  companyName,
                  companyId,
                  applicationDeadline,
                  createdAt,
                  canApplyJob = true,
                } = item;

                const actualJobId = jobId || _id;

                return (
                  <tr
                    key={_id || index}
                    className={`group transition-colors duration-150 hover:bg-zinc-900/50 ${
                      index !== savedJobs.length - 1 ? "border-b border-zinc-800/40" : ""
                    }`}
                  >
                    {/* Job Name & Company */}
                    <td className="px-5 py-4 min-w-55">
                      <div className="space-y-1">
                        <Link
                          href={`/browse-jobs/details/${actualJobId}`}
                          className="text-sm font-bold text-white leading-tight hover:text-primary transition-colors duration-200 line-clamp-1"
                        >
                          {jobName || "Untitled Job"}
                        </Link>
                        <p className="text-xs text-zinc-400">
                          {companyName ? (
                     
                              companyName
                          
                          ) : (
                            "—"
                          )}
                        </p>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {canApplyJob ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <FiCheckCircle className="size-3.5" />
                          Accepting Applications
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <FiXCircle className="size-3.5" />
                          Application Closed
                        </span>
                      )}
                    </td>

                    {/* Timeline (Relative Time) */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <FiClock className="text-zinc-500 shrink-0" />
                        <span>
                          {canApplyJob
                            ? `Saved ${formatRelativeDate(createdAt)}`
                            : `Application closed ${formatRelativeDate(applicationDeadline)}`}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {canApplyJob ? (
                          <Link
                            href={`/browse-jobs/details/${actualJobId}/apply`}
                            className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                          >
                            <span>Apply Now</span>
                            <FiSend className="size-3" />
                          </Link>
                        ) : (
                          <span className="text-xs text-zinc-600 font-medium px-3 py-1.5 bg-rose-500/10  border border-rose-500/20 rounded-lg">
                            Closed
                          </span>
                        )}

                        <DeleteSavedJobDialog
                          userId={userId || item.userId}
                          jobId={actualJobId}
                          jobName={jobName}
                          canApplyJob={canApplyJob}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ─────────────────────────────────────────────────── */}
      <SavedJobPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default SeekerSavedJobsTable;
