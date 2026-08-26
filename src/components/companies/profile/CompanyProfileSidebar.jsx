"use client";

import { useState } from "react";
import {
  RiBuilding4Line,
  RiMapPinLine,
  RiUser3Line,
  RiStackLine,
  RiGlobalLine,
  RiShareLine,
  RiCheckLine,
  RiExternalLinkLine,
} from "react-icons/ri";


export default function CompanyProfileSidebar({ company }) {
  const [copied, setCopied] = useState(false);

  if (!company) return null;

  const {
    name = "Company",
    industry,
    location,
    employeeRange,
    website,
    status = "approved",
  } = company;

  const formattedWebsite = website
    ? website.startsWith("http://") || website.startsWith("https://")
      ? website
      : `https://${website}`
    : null;

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl backdrop-blur-sm">
      {/* Title Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
          <RiBuilding4Line className="text-xl" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          Company Quick Details
        </h3>
      </div>

      {/* Metadata list */}
      <div className="space-y-4">
        {industry && (
          <div className="flex items-start gap-3">
            <RiStackLine className="text-zinc-400 mt-1 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Industry
              </p>
              <p className="text-sm font-semibold text-white truncate mt-0.5">
                {industry}
              </p>
            </div>
          </div>
        )}

        {location && (
          <div className="flex items-start gap-3">
            <RiMapPinLine className="text-zinc-400 mt-1 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm font-semibold text-white truncate mt-0.5">
                {location}
              </p>
            </div>
          </div>
        )}

        {employeeRange && (
          <div className="flex items-start gap-3">
            <RiUser3Line className="text-zinc-400 mt-1 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Company Size
              </p>
              <p className="text-sm font-semibold text-white truncate mt-0.5">
                {employeeRange}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <RiCheckLine className="text-emerald-400 mt-1 shrink-0 text-base" />
          <div className="min-w-0">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Verification Status
            </p>
            <p className="text-sm font-semibold text-emerald-400 truncate mt-0.5 capitalize">
              {status}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800/80 pt-5 space-y-3">
        {formattedWebsite && (
          <a
            href={formattedWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs sm:text-sm transition-all duration-200"
          >
            <RiGlobalLine className="text-base" />
            <span>Visit Website</span>
            <RiExternalLinkLine className="text-xs opacity-70" />
          </a>
        )}

        <button
          onClick={handleShare}
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all duration-200"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-emerald-400 text-base" />
              <span className="text-emerald-400">Profile Link Copied!</span>
            </>
          ) : (
            <>
              <RiShareLine className="text-base" />
              <span>Share Company Profile</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
