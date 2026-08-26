"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";
import { FiUsers, FiExternalLink, FiPhone, FiMail, FiFileText } from "react-icons/fi";
import ApplicantStatusSelect from "./ApplicantStatusSelect";
import ApplicantMessageModal from "./ApplicantMessageModal";
import ApplicantFilterTabs from "./ApplicantFilterTabs";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// Generates fallback avatar initial
const getInitials = (name = "") => {
  return name?.trim()?.charAt(0)?.toUpperCase() || "?";
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ currentStatus }) => {
  const isFiltered = currentStatus && currentStatus !== "all";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-zinc-800/60 rounded-xl bg-zinc-950/40">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
        <FiUsers className="size-7 text-zinc-600" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">
        {isFiltered ? `No "${currentStatus}" Applicants` : "No Applications Yet"}
      </h3>
      <p className="text-zinc-500 text-sm max-w-sm mb-2 leading-relaxed">
        {isFiltered
          ? `There are currently no job seekers with the "${currentStatus}" status for this post.`
          : "No candidates have applied for this job listing yet. Check back soon!"}
      </p>
    </div>
  );
};

// ─── Pagination ───────────────────────────────────────────────────────────────

const ApplicantsPagination = ({ currentPage = 1, totalPages = 1 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
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

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * RecruiterJobApplicantsTable
 * Main client component rendering applicants list with filtering & pagination.
 *
 * @param {{
 *   applications: Array,
 *   pagination: { currentPage: number, limit: number, totalApplications: number, totalPages: number },
 *   currentStatus: string,
 *   defaultJobTitle?: string
 * }} props
 */
const RecruiterJobApplicantsTable = ({
  applications = [],
  pagination = {},
  currentStatus = "all",
  defaultJobTitle,
}) => {
  const currentPage = Number(pagination?.currentPage) || 1;
  const totalPages = Number(pagination?.totalPages) || 1;
  const totalApplications = Number(pagination?.totalApplications) || 0;

  return (
    <div className="space-y-6">
      {/* ── Filter Tabs ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <ApplicantFilterTabs currentStatus={currentStatus} />

        <p className="text-xs text-zinc-500 font-medium shrink-0">
          Showing{" "}
          <span className="text-zinc-300 font-semibold">{applications.length}</span> of{" "}
          <span className="text-zinc-300 font-semibold">{totalApplications}</span> applicant
          {totalApplications === 1 ? "" : "s"}
        </p>
      </div>

      {/* ── Table / Empty State ────────────────────────────────────────────── */}
      {applications.length === 0 ? (
        <EmptyState currentStatus={currentStatus} />
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/60 bg-zinc-950/40">
          <table className="w-full text-left border-collapse">
            {/* ── Head ────────────────────────────────────────────────────── */}
            <thead>
              <tr className="border-b border-zinc-800/60">
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Applicant
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Job Position
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Date Applied
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-center whitespace-nowrap">
                  Resume
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-center whitespace-nowrap">
                  Message
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>

            {/* ── Body ────────────────────────────────────────────────────── */}
            <tbody>
              {applications.map((app, index) => {
                const hasResume = Boolean(app.resumeDriveLink && app.resumeDriveLink.trim());

                return (
                  <tr
                    key={app._id || index}
                    className={`group transition-colors duration-150 hover:bg-zinc-900/50 ${
                      index !== applications.length - 1 ? "border-b border-zinc-800/40" : ""
                    }`}
                  >
                    {/* Applicant Info (Avatar, Name, Email, Phone) */}
                    <td className="px-5 py-4 min-w-55 ">
                      <div className="flex items-center gap-3">
                        {app.avatar ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={app.avatar}
                            alt={app.name || "Avatar"}
                            className="w-9 h-9 rounded-full object-cover border border-zinc-800 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold text-sm flex items-center justify-center shrink-0">
                            {getInitials(app.name)}
                          </div>
                        )}
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-sm font-bold text-white leading-tight truncate group-hover:text-primary transition-colors duration-200">
                            {app.name || "Unknown Applicant"}
                          </p>
                          {app.email && (
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400 truncate">
                              <FiMail className="size-3 text-zinc-500 shrink-0" />
                              <span className="truncate">{app.email}</span>
                            </div>
                          )}
                          {app.phone && (
                            <div className="flex items-center gap-1 text-[11px] text-zinc-500 truncate">
                              <FiPhone className="size-3 text-zinc-600 shrink-0" />
                              <span className="truncate">{app.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Job Position */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-zinc-300">
                        {app.jobName || defaultJobTitle || "—"}
                      </span>
                    </td>

                    {/* Date Applied */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-sm text-zinc-400">
                        {formatRelativeDate(app.createdAt)}
                      </span>
                    </td>

                    {/* Resume Icon Link */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      {hasResume ? (
                        <a
                          href={app.resumeDriveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open resume link"
                          aria-label={`Open resume for ${app.name}`}
                          className="inline-flex p-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                        >
                          <FiFileText className="size-4" />
                        </a>
                      ) : (
                        <span
                          title="No resume link provided"
                          className="inline-flex p-2 rounded-lg text-zinc-700 opacity-50 cursor-not-allowed"
                        >
                          <FiFileText className="size-4" />
                        </span>
                      )}
                    </td>

                    {/* Cover Message Modal Trigger */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <ApplicantMessageModal
                        message={app.message}
                        name={app.name}
                        jobName={app.jobName || defaultJobTitle}
                        email={app.email}
                      />
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <ApplicantStatusSelect
                        applicationId={app._id}
                        initialStatus={app.status}
                        applicantName={app.name}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ─────────────────────────────────────────────────────── */}
      <ApplicantsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default RecruiterJobApplicantsTable;
