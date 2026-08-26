"use client";

import Image from "next/image";
import { FiLayers, FiMapPin, FiUsers } from "react-icons/fi";
import { PiBuildingsDuotone } from "react-icons/pi";

export default function CompanyInfoCard({ company }) {
  if (!company) return null;

  const { name, industry, location, employeeRange, logo } = company;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
          <PiBuildingsDuotone className="text-lg" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          About the Company
        </h3>
      </div>

      {/* Logo & Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden p-2">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              sizes="60px"
              priority
              className="object-contain p-1.5"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-emerald-400 font-extrabold text-xl uppercase rounded-xl">
              {name?.charAt(0) || "C"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="text-base font-bold text-white truncate">{name}</h4>
          {industry && (
            <p className="text-xs text-zinc-400 font-medium truncate mt-0.5">
              {industry}
            </p>
          )}
        </div>
      </div>

      {/* Metadata list */}
      <div className="space-y-4 pt-2">
        {industry && (
          <div className="flex items-center gap-3 text-sm">
            <FiLayers className="text-zinc-500 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-500 font-medium uppercase">Industry</p>
              <p className="text-sm font-semibold text-zinc-200 truncate">{industry}</p>
            </div>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-3 text-sm">
            <FiMapPin className="text-zinc-500 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-500 font-medium uppercase">HQ Location</p>
              <p className="text-sm font-semibold text-zinc-200 truncate">{location}</p>
            </div>
          </div>
        )}

        {employeeRange && (
          <div className="flex items-center gap-3 text-sm">
            <FiUsers className="text-zinc-500 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-500 font-medium uppercase">Company Size</p>
              <p className="text-sm font-semibold text-zinc-200 truncate">{employeeRange}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
