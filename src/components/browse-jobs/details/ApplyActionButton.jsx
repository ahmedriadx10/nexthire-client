"use client";

import Link from "next/link";
import { FiSend, FiCheckCircle, FiLock } from "react-icons/fi";

export default function ApplyActionButton({ jobId, canApply, isApplied }) {
  // Case 1: User has already applied for this job
  if (isApplied) {
    return (
      <div className="flex flex-col items-stretch sm:items-end gap-1.5">
        <button
          disabled
          aria-disabled="true"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-emerald-400 font-semibold text-sm border border-emerald-900/50 cursor-not-allowed opacity-90 shadow-sm"
        >
          <FiCheckCircle className="text-base text-emerald-400" />
          <span>Applied</span>
        </button>
        <span className="text-xs text-zinc-500 text-center sm:text-right">
          You have already submitted an application
        </span>
      </div>
    );
  }

  // Case 2: User is not authorized to apply (Guest, Recruiter, Admin)
  if (!canApply) {
    return (
      <div className="flex flex-col items-stretch sm:items-end gap-1.5">
        <button
          disabled
          aria-disabled="true"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800/80 text-zinc-500 font-medium text-sm border border-zinc-700/50 cursor-not-allowed shadow-sm"
        >
          <FiLock className="text-base text-zinc-500" />
          <span>Apply Now</span>
        </button>
        <span className="text-xs text-zinc-400 text-center sm:text-right">
          Sign in as a Job Seeker to apply
        </span>
      </div>
    );
  }

  // Case 3: User can apply
  return (
    <Link
      href={`/browse-jobs/details/${jobId}/apply`}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>Apply Now</span>
      <FiSend className="text-base" />
    </Link>
  );
}
