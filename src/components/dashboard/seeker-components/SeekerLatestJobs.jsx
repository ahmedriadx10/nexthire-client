"use client";

import Link from "next/link";
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

// ── Date Formatting ───────────────────────────────────────────────────────────
const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ── Job Type Badge ────────────────────────────────────────────────────────────
const JOB_TYPE_CONFIG = {
  "full-time": {
    label: "Full-Time",
    className: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  "part-time": {
    label: "Part-Time",
    className: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  remote: {
    label: "Remote",
    className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  contract: {
    label: "Contract",
    className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  internship: {
    label: "Internship",
    className: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
};

const JobTypeBadge = ({ type }) => {
  const config =
    JOB_TYPE_CONFIG[type?.toLowerCase()] || {
      label: type || "Other",
      className: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

// ── Empty State ───────────────────────────────────────────────────────────────
const EmptyJobsState = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
    <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center">
      <FiBriefcase className="text-zinc-500 text-2xl" />
    </div>
    <div>
      <p className="text-sm font-semibold text-zinc-300">No jobs available</p>
      <p className="text-xs text-zinc-600 font-light mt-1 max-w-xs">
        New job listings will appear here. Check back soon.
      </p>
    </div>
    <Link href="/browse-jobs">
      <button className="mt-1 px-5 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer">
        Browse All Jobs
      </button>
    </Link>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * SeekerLatestJobs — Client Component
 *
 * Displays the latest active job listings on the platform.
 *
 * @param {Object} props
 * @param {Array}  props.jobs - Array of latest job objects from the API.
 */
const SeekerLatestJobs = ({ jobs = [] }) => {
  const list = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
            Latest Jobs
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Recently posted positions across the platform
          </p>
        </div>
        {list.length > 0 && (
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
          >
            View All <FiArrowRight className="text-xs" />
          </Link>
        )}
      </div>

      {/* ── Content ── */}
      <div className="px-6 py-2">
        {list.length === 0 ? (
          <EmptyJobsState />
        ) : (
          <ul className="divide-y divide-zinc-800/50">
            {list.map((job) => (
              <li key={job._id} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Job Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate leading-snug">
                      {job.jobTitle}
                    </p>
                    {job.jobCategory && (
                      <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                        {job.jobCategory}
                      </p>
                    )}

                    {/* Meta chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {job.location && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 font-light">
                          <FiMapPin className="text-[10px] shrink-0 text-zinc-500" />
                          {job.location}
                        </span>
                      )}
                      {job.experienceLevel && (
                        <span className="text-[11px] text-zinc-500 font-light">
                          · {job.experienceLevel}
                        </span>
                      )}
                      {job.applicationDeadline && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-light">
                          <FiClock className="text-[10px] shrink-0" />
                          Closes {formatDate(job.applicationDeadline)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Badge + CTA */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <JobTypeBadge type={job.jobType} />
                    <Link
                      href={`/browse-jobs/details/${job._id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View <FiArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SeekerLatestJobs;
