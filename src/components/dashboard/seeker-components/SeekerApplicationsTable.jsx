"use client";

import Link from "next/link";
import { FiBriefcase, FiExternalLink, FiClock, FiSearch, FiLayers } from "react-icons/fi";
import SeekerApplicationsFilter from "./SeekerApplicationsFilter";
import SeekerApplicationsPagination from "./SeekerApplicationsPagination";
import SeekerApplicationMessageModal from "./SeekerApplicationMessageModal";
import SeekerApplicationStatusSelect from "./SeekerApplicationStatusSelect";

/**
 * Formats a date string into readable date string.
 */
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

/**
 * Formats relative date/time (e.g., 2d ago).
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
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  } catch {
    return "—";
  }
};

/**
 * Empty state component when no applications are found.
 */
const EmptyState = ({ filterActive = false }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-zinc-800/60 rounded-2xl bg-zinc-950/40">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiLayers className="size-7 text-zinc-600" />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">
      {filterActive ? "No Applications Found" : "No Applications Submitted Yet"}
    </h3>
    <p className="text-zinc-500 text-sm max-w-xs mb-6 leading-relaxed">
      {filterActive
        ? "No applications matched your search or status filter criteria. Try adjusting your filter."
        : "You haven't submitted any job applications yet. Explore available jobs and submit your application."}
    </p>
    {!filterActive && (
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
 * SeekerApplicationsTable Component
 *
 * @param {Object} props
 * @param {Array} props.applications - List of application objects from backend.
 * @param {number} props.totalApplications - Total applications count.
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total pages count.
 * @param {string} props.searchQuery - Current search query.
 * @param {string} props.statusQuery - Current status filter.
 */
const SeekerApplicationsTable = ({
  applications = [],
  totalApplications = 0,
  currentPage = 1,
  totalPages = 1,
  searchQuery = "",
  statusQuery = "",
}) => {
  const hasApplications = applications && applications.length > 0;
  const isFilterActive = Boolean(searchQuery || (statusQuery && statusQuery !== "all"));

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Search, Status Filter & Summary ──────────────────── */}
      <div className="space-y-4">
        <SeekerApplicationsFilter
          initialSearch={searchQuery}
          initialStatus={statusQuery}
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-medium">
            Showing{" "}
            <span className="text-zinc-300 font-semibold">{applications.length}</span> of{" "}
            <span className="text-zinc-300 font-semibold">{totalApplications}</span> application
            {totalApplications === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* ── Content: Empty State or Table ─────────────────────────────── */}
      {!hasApplications ? (
        <EmptyState filterActive={isFilterActive} />
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/60 bg-zinc-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60">
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Job Position
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Submitted Resume & Note
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Applied Date
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right whitespace-nowrap">
                  Status / Action
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => {
                const {
                  _id,
                  jobId,
                  jobName,
                  companyId,
                  companyName,
                  name,
                  email,
                  phone,
                  resumeDriveLink,
                  message,
                  status,
                  createdAt,
                } = app;

                const actualJobId = jobId || _id;

                return (
                  <tr
                    key={_id || index}
                    className={`group transition-colors duration-150 hover:bg-zinc-900/50 ${
                      index !== applications.length - 1 ? "border-b border-zinc-800/40" : ""
                    }`}
                  >
                    {/* Job Name */}
                    <td className="px-5 py-4 min-w-55">
                      <div className="space-y-1">
                        <Link
                          href={`/browse-jobs/details/${actualJobId}`}
                          className="text-sm font-bold text-white leading-tight hover:text-primary transition-colors duration-200 line-clamp-1 inline-flex items-center gap-1.5"
                        >
                          <span>{jobName || "Untitled Job"}</span>
                        </Link>
                        {companyName && (
                          <p className="text-xs text-zinc-400 font-medium">
                            {companyName}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Resume Drive Link & Message Modal */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {resumeDriveLink ? (
                          <a
                            href={resumeDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
                            title="View submitted resume"
                          >
                            <span>Resume</span>
                            <FiExternalLink className="size-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-zinc-600 font-medium">No link</span>
                        )}

                        <SeekerApplicationMessageModal
                          message={message}
                          jobName={jobName}
                          name={name}
                          email={email}
                          phone={phone}
                          resumeDriveLink={resumeDriveLink}
                        />
                      </div>
                    </td>

                    {/* Applied Date (createdAt) */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <FiClock className="text-zinc-500 shrink-0" />
                        <span title={formatDate(createdAt)}>
                          {formatRelativeDate(createdAt)} ({formatDate(createdAt)})
                        </span>
                      </div>
                    </td>

                    {/* Status & Update Action */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <SeekerApplicationStatusSelect
                        applicationId={_id}
                        initialStatus={status}
                        jobName={jobName}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ─────────────────────────────────────────────────── */}
      <SeekerApplicationsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default SeekerApplicationsTable;
