"use client";

import { useState } from "react";
import Link from "next/link";
import { FiBookmark, FiMapPin, FiDollarSign, FiBriefcase } from "react-icons/fi";
import toast from "react-hot-toast";
import { saveSeekerJob, deleteSavedSeekerJob } from "@/lib/actions/seeker-action/savedJobActions";

/**
 * Formats a salary number into a compact string e.g. 180000 → "$180k"
 */
const formatSalary = (amount, currency = "USD") => {
  if (!amount && amount !== 0) return null;
  const symbol = currency === "USD" ? "$" : currency;
  if (amount >= 1000) return `${symbol}${(amount / 1000).toFixed(0)}k`;
  return `${symbol}${amount}`;
};

/**
 * Capitalises and formats jobType slug e.g. "full-time" → "Full-time"
 */
const formatJobType = (type) => {
  if (!type) return "";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const JobCard = ({ job, canSaveJob }) => {
  const [saved, setSaved] = useState(job?.isSaved ?? false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const {
    _id,
    jobTitle,
    companyName,
    city,
    country,
    isRemote,
    jobType,
    salaryMin,
    salaryMax,
    currency,
  } = job;

  const salaryMin_f = formatSalary(salaryMin, currency);
  const salaryMax_f = formatSalary(salaryMax, currency);
  const salaryLabel =
    salaryMin_f && salaryMax_f
      ? `${salaryMin_f} – ${salaryMax_f}`
      : salaryMin_f || salaryMax_f || null;

  const locationLabel = [city, country].filter(Boolean).join(", ");

  const handleBookmark = async (e) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation();
    if (bookmarkLoading) return;

    // Optimistic toggle
    const prevSaved = saved;
    setSaved(!prevSaved);
    setBookmarkLoading(true);

    try {
      if (prevSaved) {
        await deleteSavedSeekerJob(_id);
        toast.success("Job removed from saved.");
      } else {
        await saveSeekerJob({ jobId: _id, jobTitle, companyName });
        toast.success("Job saved!");
      }
    } catch (err) {
      // Revert on failure
      setSaved(prevSaved);
      toast.error(err?.message || (prevSaved ? "Failed to unsave job." : "Failed to save job."));
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <Link
      href={`/browse-jobs/details/${_id}`}
      className="group block bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Company logo placeholder */}
        <div className="shrink-0 w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
          <span className="text-xs font-bold text-zinc-500 uppercase select-none">
            {companyName?.charAt(0) || "?"}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white truncate leading-snug">
                {jobTitle}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-sm text-zinc-400">{companyName}</span>
                {locationLabel && (
                  <>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-sm text-zinc-400">
                      <FiMapPin className="shrink-0 text-xs" />
                      {locationLabel}
                      {isRemote && (
                        <span className="ml-1 text-xs text-emerald-400 font-medium">
                          (Remote)
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Bookmark button */}
            {canSaveJob && (
              <button
                onClick={handleBookmark}
                disabled={bookmarkLoading}
                aria-label={saved ? "Unsave job" : "Save job"}
                className="shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-all duration-150 disabled:opacity-50"
              >
                <FiBookmark
                  className={`text-lg transition-all duration-200 ${
                    saved ? "fill-zinc-200 text-zinc-200" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {salaryLabel && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 rounded-lg px-2.5 py-1">
                <FiDollarSign className="text-xs" />
                {salaryLabel}
              </span>
            )}
            {jobType && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1">
                <FiBriefcase className="text-xs" />
                {formatJobType(jobType)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
