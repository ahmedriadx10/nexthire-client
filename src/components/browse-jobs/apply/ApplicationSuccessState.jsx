"use client";

import Link from "next/link";
import { FiCheckCircle, FiArrowRight, FiBriefcase, FiGrid } from "react-icons/fi";

export default function ApplicationSuccessState({ jobTitle, companyName }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 max-w-2xl mx-auto my-8">
      {/* Glow check icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
        <div className="relative p-5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400">
          <FiCheckCircle className="text-5xl" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Application Submitted!
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          {jobTitle && companyName ? (
            <>
              Your application for <span className="text-zinc-200 font-semibold">{jobTitle}</span> at{" "}
              <span className="text-zinc-200 font-semibold">{companyName}</span> has been received.
            </>
          ) : (
            "Your application has been successfully recorded. The hiring team will review your profile."
          )}
        </p>
      </div>

      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400 max-w-md mx-auto text-left space-y-1.5">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <FiCheckCircle className="shrink-0 text-sm" />
          <span>What happens next?</span>
        </div>
        <p className="text-zinc-400 pl-5">
          1. The employer will review your profile & submitted resume link.
        </p>
        <p className="text-zinc-400 pl-5">
          2. You will be notified regarding interview updates or status changes.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/dashboard/seeker/applications"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
        >
          <FiGrid className="text-base" />
          <span>View My Applications</span>
          <FiArrowRight className="text-base" />
        </Link>
        <Link
          href="/browse-jobs"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm transition-all border border-zinc-700/50"
        >
          <FiBriefcase className="text-base" />
          <span>Browse More Jobs</span>
        </Link>
      </div>
    </div>
  );
}
