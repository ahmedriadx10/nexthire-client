"use client";

import Link from "next/link";
import { FiArrowUpRight, FiInbox, FiUser, FiBriefcase, FiCalendar } from "react-icons/fi";

const statusConfig = {
  applied: { label: "Applied", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  screening: { label: "Screening", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  shortlisted: { label: "Shortlisted", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  interview: { label: "Interview", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  hired: { label: "Hired", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  rejected: { label: "Rejected", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const formatRelativeDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "—";
  }
};

const RecruiterRecentApplicationsTable = ({ applications = [] }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FiUser className="text-primary size-5" />
            Recent Applications
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Latest candidate submissions across active job postings
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
          {applications.length} Received
        </span>
      </div>

      {/* Content */}
      {applications.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="size-12 rounded-full bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mb-3">
            <FiInbox className="size-6 text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-200 mb-1">No Recent Applications</h3>
          <p className="text-xs text-zinc-400 max-w-sm">
            When job seekers submit applications for your job posts, they will appear right here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                <th className="pb-3 pr-4">Applicant</th>
                <th className="pb-3 px-4">Job Title</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Applied</th>
                <th className="pb-3 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {applications.map((app) => {
                const statusKey = (app.status || "applied").toLowerCase();
                const statusInfo = statusConfig[statusKey] || {
                  label: app.status || "Applied",
                  color: "bg-zinc-800 text-zinc-300 border-zinc-700",
                };

                return (
                  <tr
                    key={app._id}
                    className="hover:bg-zinc-800/30 transition-colors duration-150 group"
                  >
                    {/* Applicant Name */}
                    <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 font-bold text-xs uppercase shrink-0">
                          {app.name ? app.name.charAt(0) : "U"}
                        </div>
                        <span className="truncate max-w-35 sm:max-w-45">
                          {app.name || "Anonymous Applicant"}
                        </span>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                        <FiBriefcase className="size-3.5 text-zinc-400 shrink-0" />
                        <span className="font-medium text-zinc-200 truncate max-w-37.5 sm:max-w-50">
                          {app.jobName || "Job Listing"}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td className="py-3.5 px-4 text-xs text-zinc-400 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="size-3 text-zinc-400 shrink-0" />
                        <span>{formatRelativeDate(app.createdAt)}</span>
                      </div>
                    </td>

                    {/* Action Link */}
                    <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                      {app.jobId ? (
                        <Link
                          href={`/dashboard/recruiter/jobs/${app.jobId}/applicants`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                          View
                          <FiArrowUpRight className="size-3.5" />
                        </Link>
                      ) : (
                        <span className="text-zinc-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecruiterRecentApplicationsTable;
