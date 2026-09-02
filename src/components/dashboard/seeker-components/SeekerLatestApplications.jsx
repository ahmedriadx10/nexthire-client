"use client";

import Link from "next/link";
import { FiFileText, FiArrowRight, FiClock } from "react-icons/fi";

// ── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
  },
  screening: {
    label: "Screening",
    className: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  interview: {
    label: "Interview",
    className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  hired: {
    label: "Hired",
    className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "text-red-400 bg-red-500/10 border-red-500/20",
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

// ── Date Formatting ───────────────────────────────────────────────────────────
const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ── Empty State ───────────────────────────────────────────────────────────────
const EmptyApplicationsState = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
    <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center">
      <FiFileText className="text-zinc-500 text-2xl" />
    </div>
    <div>
      <p className="text-sm font-semibold text-zinc-300">No applications yet</p>
      <p className="text-xs text-zinc-600 font-light mt-1 max-w-xs">
        Start applying to jobs to track your application status here.
      </p>
    </div>
    <Link href="/browse-jobs">
      <button className="mt-1 px-5 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer">
        Browse Jobs
      </button>
    </Link>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * SeekerLatestApplications — Client Component
 *
 * Displays the seeker's latest job applications with status badges and updatedAt timestamp.
 *
 * @param {Object} props
 * @param {Array}  props.applications - Array of latest application objects.
 */
const SeekerLatestApplications = ({ applications = [] }) => {
  const list = Array.isArray(applications) ? applications : [];

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
            Latest Applications
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Your most recent job submissions
          </p>
        </div>
        {list.length > 0 && (
          <Link
            href="/dashboard/seeker/applications"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
          >
            View All <FiArrowRight className="text-xs" />
          </Link>
        )}
      </div>

      {/* ── Content ── */}
      <div className="px-6 py-2">
        {list.length === 0 ? (
          <EmptyApplicationsState />
        ) : (
          <ul className="divide-y divide-zinc-800/50">
            {list.map((app) => (
              <li
                key={app._id}
                className="flex items-center justify-between gap-4 py-4"
              >
                {/* Job Name */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate leading-snug">
                    {app.jobName || "Unknown Position"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-light mt-1">
                    <FiClock className="text-[10px] shrink-0" />
                    Updated {formatDate(app.updatedAt)}
                  </span>
                </div>

                {/* Status Badge */}
                <StatusBadge status={app.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SeekerLatestApplications;
