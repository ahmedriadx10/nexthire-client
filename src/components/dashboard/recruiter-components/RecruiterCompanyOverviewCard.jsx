"use client";

import Link from "next/link";
import { FiBriefcase, FiGlobe, FiMapPin, FiExternalLink, FiEdit3, FiPlusCircle } from "react-icons/fi";

const RecruiterCompanyOverviewCard = ({ company = null }) => {
  if (!company || !_hasCompanyData(company)) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/60">
            <FiBriefcase className="text-primary size-5" />
            <h2 className="text-lg font-bold text-white tracking-tight">Company Profile</h2>
          </div>
          <div className="py-6 text-center">
            <div className="size-14 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <FiBriefcase className="size-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Company Linked</h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Register your company profile to start posting jobs and getting applicant inquiries.
            </p>
            <Link
              href="/dashboard/recruiter/company"
              className="inline-flex items-center gap-2 bg-primary text-zinc-950 font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-xs shadow-md"
            >
              <FiPlusCircle className="size-4" />
              Setup Company Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { name, industry, website, location, logo } = company;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FiBriefcase className="text-primary size-5" />
            Company Overview
          </h2>
          <Link
            href="/dashboard/recruiter/company"
            className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <FiEdit3 className="size-3.5" />
            Manage
          </Link>
        </div>

        {/* Company Identity */}
        <div className="flex items-start gap-4 mb-6">
          {logo ? (
            <div className="size-14 rounded-xl bg-zinc-950 border border-zinc-800 p-2 flex items-center justify-center shrink-0 overflow-hidden">
              {/* Using standard img for external CDN images */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={name || "Company Logo"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
              {name ? name.charAt(0) : "C"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-extrabold text-white truncate tracking-tight">
              {name || "Company Name"}
            </h3>
            {industry && (
              <span className="inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                {industry}
              </span>
            )}
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-3 pt-2">
          {location && (
            <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-zinc-950/50 border border-zinc-800/40">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <FiMapPin className="size-3.5 text-zinc-400" />
                Location
              </span>
              <span className="font-semibold text-zinc-200">{location}</span>
            </div>
          )}

          {website && (
            <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-zinc-950/50 border border-zinc-800/40">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <FiGlobe className="size-3.5 text-zinc-400" />
                Website
              </span>
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline flex items-center gap-1 truncate max-w-40"
              >
                <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                <FiExternalLink className="size-3 shrink-0" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60">
        <Link
          href="/dashboard/recruiter/company"
          className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 font-semibold px-4 py-2.5 rounded-xl border border-zinc-700/60 transition-colors text-xs"
        >
          View & Edit Company Profile
        </Link>
      </div>
    </div>
  );
};

const _hasCompanyData = (comp) => {
  if (!comp || typeof comp !== "object") return false;
  return Boolean(comp.name || comp._id || comp.industry || comp.logo);
};

export default RecruiterCompanyOverviewCard;
