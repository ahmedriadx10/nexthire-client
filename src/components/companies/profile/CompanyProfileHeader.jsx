"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiGlobalLine,
  RiMapPinLine,
  RiUser3Line,
  RiStackLine,
  RiExternalLinkLine,
  RiCalendarLine,
} from "react-icons/ri";

export default function CompanyProfileHeader({ company }) {
  const [imageError, setImageError] = useState(false);

  if (!company) return null;

  const {
    name = "Unnamed Company",
    industry = "General",
    website,
    location = "Global",
    employeeRange,
    logo,
    createdAt,
    status = "approved",
  } = company;

  // Format creation date if available
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // Ensure website URL has protocol
  const formattedWebsite = website
    ? website.startsWith("http://") || website.startsWith("https://") ? website  : `https://${website}` : null;

  return (
    <div className="space-y-6">
      {/* Back Navigation Button */}
      <div>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200 group"
        >
          <RiArrowLeftLine className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Companies</span>
        </Link>
      </div>

      {/* Main Hero Card */}
      <div className="relative overflow-hidden bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-2xl">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          {/* Left section: Logo & Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            {/* Logo container */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 p-2 shadow-inner">
              {logo && !imageError ? (
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  fill
                  sizes="96px"
                  priority
                  className="object-contain p-2"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-black text-3xl uppercase rounded-xl">
                  {name.charAt(0)}
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {name}
                </h1>
                {status === "approved" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 select-none">
                    <RiCheckLine className="text-xs" />
                    <span>VERIFIED</span>
                  </span>
                )}
              </div>

              {/* Badges / Quick info pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
                {industry && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-medium">
                    <RiStackLine className="text-zinc-400" />
                    <span>{industry}</span>
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-medium">
                    <RiMapPinLine className="text-zinc-400" />
                    <span>{location}</span>
                  </span>
                )}
                {employeeRange && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-medium">
                    <RiUser3Line className="text-zinc-400" />
                    <span>{employeeRange}</span>
                  </span>
                )}
                {formattedDate && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-400 font-normal">
                    <RiCalendarLine className="text-zinc-500" />
                    <span>Joined {formattedDate}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right section: Website CTA button */}
          {formattedWebsite && (
            <div className="shrink-0 pt-2 md:pt-0">
              <a
                href={formattedWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-zinc-700/20 active:scale-95 w-full sm:w-auto"
              >
                <RiGlobalLine className="text-base" />
                <span>Visit Website</span>
                <RiExternalLinkLine className="text-sm opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
