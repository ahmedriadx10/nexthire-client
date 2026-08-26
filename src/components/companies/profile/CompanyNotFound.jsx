"use client";

import Link from "next/link";
import { RiBuilding4Line, RiArrowLeftLine } from "react-icons/ri";

export default function CompanyNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-10 md:p-14 max-w-lg w-full text-center space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
          <RiBuilding4Line className="text-4xl" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Company Profile Not Found
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-light">
            The company you are looking for does not exist, may have been removed, or is currently unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/companies"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-zinc-700/20 active:scale-95"
          >
            <RiArrowLeftLine className="text-lg" />
            <span>Browse All Companies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
