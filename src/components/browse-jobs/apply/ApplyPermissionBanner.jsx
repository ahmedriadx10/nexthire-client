"use client";

import Link from "next/link";
import { FiLock, FiAlertTriangle, FiArrowLeft, FiLogIn, FiUserPlus } from "react-icons/fi";

export default function ApplyPermissionBanner({ jobId, isGuest, role }) {
  if (isGuest) {
    return (
      <div className="bg-zinc-900 border border-amber-900/50 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6 max-w-xl mx-auto my-8">
        <div className="p-4 rounded-full bg-amber-950/80 border border-amber-800 text-amber-400 inline-block">
          <FiLock className="text-4xl" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign In Required
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            You must be signed in as a <span className="text-amber-400 font-semibold">Job Seeker</span> to submit an application for this position.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/login`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            <FiLogIn className="text-base" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm transition-all border border-zinc-700/50"
          >
            <FiUserPlus className="text-base" />
            <span>Register Account</span>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href={`/browse-jobs/details/${jobId}`}
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <FiArrowLeft />
            <span>Return to Job Details</span>
          </Link>
        </div>
      </div>
    );
  }

  // User is logged in, but role is Recruiter / Admin / not allowed
  return (
    <div className="bg-zinc-900 border border-red-900/40 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6 max-w-xl mx-auto my-8">
      <div className="p-4 rounded-full bg-red-950/80 border border-red-800 text-red-400 inline-block">
        <FiAlertTriangle className="text-4xl" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Application Restricted
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          Your current account role <span className="text-red-400 font-semibold uppercase">({role || "non-seeker"})</span> is not permitted to submit job applications. Only Job Seeker accounts can apply.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/browse-jobs/details/${jobId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-zinc-700/50"
        >
          <FiArrowLeft className="text-base" />
          <span>Back to Job Details</span>
        </Link>
        <Link
          href="/browse-jobs"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-sm transition-all border border-zinc-800"
        >
          <span>Browse All Jobs</span>
        </Link>
      </div>
    </div>
  );
}
