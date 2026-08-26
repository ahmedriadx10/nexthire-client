"use client";

import Link from "next/link";
import {
  RiInformationLine,
  RiBriefcaseLine,
  RiStackLine,
  RiMapPinLine,
  RiUser3Line,
  RiGlobalLine,
  RiArrowRightLine,
} from "react-icons/ri";

export default function CompanyProfileContent({ company }) {
  if (!company) return null;

  const {
    name = "Company",
    description,
    industry,
    location,
    employeeRange,
    website,
  } = company;

  // Split description into paragraphs if it has double linebreaks, or render smoothly
  const paragraphs = description
    ? description.split(/\n\s*\n/).filter(Boolean)
    : ["No detailed description available for this company."];

  return (
    <div className="space-y-8">
      {/* About Company Card */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
        <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
          <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
            <RiInformationLine className="text-xl" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            About {name}
          </h2>
        </div>

        <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Key Highlights Grid */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
        <h3 className="text-lg font-bold text-white tracking-tight border-b border-zinc-800/80 pb-4">
          Company Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industry && (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                <RiStackLine className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Industry
                </p>
                <p className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
                  {industry}
                </p>
              </div>
            </div>
          )}

          {location && (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                <RiMapPinLine className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Headquarters
                </p>
                <p className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
                  {location}
                </p>
              </div>
            </div>
          )}

          {employeeRange && (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                <RiUser3Line className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Company Size
                </p>
                <p className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
                  {employeeRange}
                </p>
              </div>
            </div>
          )}

          {website && (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                <RiGlobalLine className="text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Website
                </p>
                <a
                  href={
                    website.startsWith("http") ? website : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-white hover:underline truncate mt-0.5 block"
                >
                  {website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explore Openings Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <RiBriefcaseLine className="text-xl text-emerald-400" />
            <span>Looking to Join {name}?</span>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
            Explore active job opportunities posted by {name} and apply directly on NextHire.
          </p>
        </div>

        <Link
          href={`/browse-jobs?search=${encodeURIComponent(name)}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs sm:text-sm transition-all duration-200 shrink-0 shadow-md group"
        >
          <span>Explore Open Positions</span>
          <RiArrowRightLine className="text-base group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
