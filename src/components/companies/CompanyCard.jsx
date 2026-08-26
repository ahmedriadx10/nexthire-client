"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RiBuilding4Line,
  RiCheckLine,
  RiMapPinLine,
  RiStackLine,
  RiArrowRightLine,
  RiUser3Line,
} from "react-icons/ri";
import Image from "next/image";

const CompanyCard = ({ company={} }) => {
  const [imageError, setImageError] = useState(false);

  if (!company) return null;

  const {
    _id,
    name = "Unnamed Company",
    industry = "General",
    location = "Global",
    employeeRange,
    logo,
    description = "No company description provided.",
    status = "approved",
    activeJobCount = 0,
  } = company;

  return (
    <div className="flex flex-col justify-between bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,166,251,0.08)] group h-full">
      <div>
        {/* Top Header Row: Logo & Verified Badge */}
        <div className="flex items-start justify-between gap-4 mb-5">
          {/* Logo container */}
          <div className="relative w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 p-1.5">
            {logo && !imageError ? (
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                sizes="60px"
                priority
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-primary font-extrabold text-lg uppercase rounded-lg">
                {name.charAt(0)}
              </div>
            )}
          </div>

          {/* Verified Badge */}
          {status === "approved" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 select-none shrink-0">
              <RiCheckLine className="text-xs stroke-3" />
              <span>VERIFIED</span>
            </span>
          )}
        </div>

        {/* Company Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 mb-2.5 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light mb-5">
          {description}
        </p>

        {/* Tags / Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {industry && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-950/80 border border-zinc-800/90 text-zinc-300">
              <RiStackLine className="text-zinc-400 text-xs" />
              <span>{industry}</span>
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-950/80 border border-zinc-800/90 text-zinc-300">
              <RiMapPinLine className="text-zinc-400 text-xs" />
              <span>{location}</span>
            </span>
          )}
          {!location && employeeRange && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-950/80 border border-zinc-800/90 text-zinc-300">
              <RiUser3Line className="text-zinc-400 text-xs" />
              <span>{employeeRange}</span>
            </span>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div>
        <div className="border-t border-zinc-800/80 my-4" />

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs sm:text-sm font-semibold text-zinc-300">
            {activeJobCount}{" "}
            {activeJobCount === 1 ? "Active Job" : "Active Jobs"}
          </span>

          <Link
            href={`/companies/company-profile/${_id}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-300"
          >
            <span>View Profile</span>
            <RiArrowRightLine className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
