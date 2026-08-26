"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiMapPin, FiBriefcase, FiDollarSign, FiGlobe } from "react-icons/fi";

export default function JobSummaryCard({ job }) {
  if (!job) return null;

  const {
    _id,
    jobTitle,
    jobType,
    isRemote,
    location,
    salary,
    salaryMin,
    salaryMax,
    salaryPeriod,
    company,
  } = job;

  const companyLogo = company?.logo;
  const companyName = company?.name || "Company";

  const renderSalary = () => {
    if (salary) return salary;
    if (salaryMin || salaryMax) {
      const min = salaryMin ? `$${salaryMin.toLocaleString()}` : "";
      const max = salaryMax ? `$${salaryMax.toLocaleString()}` : "";
      const period = salaryPeriod ? ` / ${salaryPeriod}` : "";
      if (min && max) return `${min} - ${max}${period}`;
      return `${min || max}${period}`;
    }
    return null;
  };

  const salaryString = renderSalary();

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div>
        <Link
          href={`/browse-jobs/details/${_id}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
        >
          <FiArrowLeft className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Job Details</span>
        </Link>
      </div>

      {/* Summary Card */}
      <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-md overflow-hidden">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden p-2">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={`${companyName} logo`}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-emerald-400 font-extrabold text-xl uppercase rounded-lg">
                {companyName.charAt(0)}
              </div>
            )}
          </div>

          {/* Job Meta */}
          <div className="min-w-0 flex-1 space-y-1">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 rounded-md px-2 py-0.5 inline-block">
              Applying for
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight leading-tight truncate">
              {jobTitle}
            </h2>
            <div className="flex items-center gap-3 flex-wrap text-xs text-zinc-400 pt-0.5">
              <span className="font-semibold text-zinc-300">{companyName}</span>

              {jobType && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1">
                    <FiBriefcase className="text-zinc-500 shrink-0" />
                    {jobType}
                  </span>
                </>
              )}

              {location && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1">
                    <FiMapPin className="text-zinc-500 shrink-0" />
                    {location}
                  </span>
                </>
              )}

              {isRemote && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <FiGlobe className="shrink-0" />
                    Remote
                  </span>
                </>
              )}

              {salaryString && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="inline-flex items-center gap-1 text-zinc-300 font-medium">
                    <FiDollarSign className="text-emerald-400 shrink-0" />
                    {salaryString}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
