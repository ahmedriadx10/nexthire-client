"use client";

import { FiCheckCircle, FiXCircle } from "react-icons/fi";

/**
 * AdminJobsStatusBadge
 * Displays colored status badge for job status ('active' | 'closed').
 *
 * @param {{ status: string }} props
 */
const AdminJobsStatusBadge = ({ status = "" }) => {
  const normalized = (status || "").toLowerCase();

  if (normalized === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
        <FiCheckCircle className="size-3" />
        <span className="capitalize">Active</span>
      </span>
    );
  }

  if (normalized === "closed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-zinc-400 bg-zinc-800/60 border border-zinc-700/60">
        <FiXCircle className="size-3" />
        <span className="capitalize">Closed</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800">
      <span className="capitalize">{status || "Unknown"}</span>
    </span>
  );
};

export default AdminJobsStatusBadge;
