"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";
import { FiBriefcase, FiCalendar, FiMapPin, FiTag } from "react-icons/fi";
import AdminJobsStatusBadge from "./AdminJobsStatusBadge";
import AdminJobActionButtons from "./AdminJobActionButtons";

// ─── Date Formatting ──────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ search, status }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-zinc-950/40 border border-zinc-800/60 rounded-2xl">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiBriefcase className="size-7 text-zinc-600" />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">No Jobs Found</h3>
    <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
      {search || (status && status !== "all")
        ? "No job postings matched your search criteria or status filter. Try adjusting your settings."
        : "There are currently no job postings available on the platform."}
    </p>
  </div>
);

// ─── Pagination Component ─────────────────────────────────────────────────────

const JobsPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

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

// ─── Main Admin Table ─────────────────────────────────────────────────────────

/**
 * AdminJobsTable
 * Client component — renders plain dark Tailwind table for all jobs.
 *
 * @param {{ jobs: Array, totalJobs: number, currentPage: number, totalPages: number, currentSearch: string, currentStatus: string }} props
 */
const AdminJobsTable = ({
  jobs = [],
  totalJobs = 0,
  currentPage = 1,
  totalPages = 1,
  currentSearch = "",
  currentStatus = "all",
}) => {
  if (!jobs || jobs.length === 0) {
    return <EmptyState search={currentSearch} status={currentStatus} />;
  }

  return (
    <div className="space-y-4">
      {/* Summary count */}
      <p className="text-xs text-zinc-500 font-medium">
        Showing{" "}
        <span className="text-zinc-300 font-semibold">{jobs.length}</span> of{" "}
        <span className="text-zinc-300 font-semibold">{totalJobs}</span>{" "}
        job{totalJobs === 1 ? "" : "s"}
      </p>

      {/* Table container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary rounded-xl border border-zinc-800/60 bg-zinc-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Job Title & Company
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Category & Type
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Location
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Deadline
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => {
              const displayLocation =
                job.location ||
                [job.city?.trim(), job.country?.trim()].filter(Boolean).join(", ") ||
                "—";

              return (
                <tr
                  key={job._id}
                  className={`group transition-colors duration-150  hover:bg-zinc-900/50 ${
                    index !== jobs.length - 1 ? "border-b border-zinc-800/40" : ""
                  }`}
                >
                  {/* Company Logo + Job Title + Company Name */}
                  <td className="px-5 py-4 min-w-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center relative">
                        {job.companyImage ? (
                          <Image
                            src={job.companyImage}
                            alt={job.companyName || "Company Logo"}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <FiBriefcase className="size-5 text-zinc-600" />
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors duration-200">
                          {job.jobTitle || "Untitled Job"}
                        </p>
                        <p className="text-xs text-zinc-400 font-medium">
                          {job.companyName || "Unknown Company"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category & Job Type */}
                  <td className="px-5 py-4 whitespace-nowrap min-w-40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                        <FiTag className="size-3 text-zinc-500 shrink-0" />
                        <span>{job.jobCategory || "General"}</span>
                      </div>
                      {job.jobType && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 capitalize">
                          {job.jobType}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4 whitespace-nowrap min-w-40 text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="size-3.5 text-zinc-500 shrink-0" />
                      <span>{displayLocation}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <AdminJobsStatusBadge status={job.status} />
                  </td>

                  {/* Deadline & Created At */}
                  <td className="px-5 py-4 whitespace-nowrap text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <FiCalendar className="size-3 text-zinc-500 shrink-0" />
                        <span>{formatDate(job.applicationDeadline)}</span>
                      </div>
                      {job.createdAt && (
                        <p className="text-[11px] text-zinc-500">
                          Posted: {formatDate(job.createdAt)}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <AdminJobActionButtons job={job} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <JobsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminJobsTable;
