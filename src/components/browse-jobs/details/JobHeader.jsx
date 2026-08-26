"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiMapPin, FiCalendar, FiGlobe, FiBriefcase } from "react-icons/fi";
import ApplyActionButton from "./ApplyActionButton";

/**
 * Formats date string into human readable format e.g. "Jul 29, 2026"
 */
const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return null;
  }
};

export default function JobHeader({ job }) {
  if (!job) return null;

  const {
    _id,
    jobTitle,
    jobType,
    isRemote,
    location,
    createdAt,
    company,
    isApplied,
    permission,
  } = job;

  const formattedDate = formatDate(createdAt);
  const companyLogo = company?.logo;
  const companyName = company?.name || "Company";

  return (
    <div className="space-y-6">
      {/* Top back navigation */}
      <div>
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
        >
          <FiArrowLeft className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left section: Logo & Job details */}
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Company Logo Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden p-2 shadow-inner">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  fill
                  sizes="80px"
                  priority
                  className="object-contain p-2"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800/80 text-emerald-400 font-extrabold text-2xl uppercase rounded-xl">
                  {companyName.charAt(0)}
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="min-w-0 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {jobTitle}
              </h1>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-sm text-zinc-400">
                <span className="font-semibold text-zinc-200">{companyName}</span>

                {location && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin className="text-xs text-zinc-500 shrink-0" />
                      {location}
                    </span>
                  </>
                )}

                {isRemote && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-900/80 rounded-md px-2 py-0.5">
                      <FiGlobe className="text-xs" />
                      Remote
                    </span>
                  </>
                )}

                {formattedDate && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                      <FiCalendar className="text-xs shrink-0" />
                      Posted {formattedDate}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right section: Action Button */}
          <div className="shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800">
            <ApplyActionButton
              jobId={_id}
              canApply={permission?.canApply}
              isApplied={isApplied}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
