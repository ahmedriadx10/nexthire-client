"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateJobStatusOrDetails } from "@/lib/actions/recruiter-action/jobActions";

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ isActive }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${
      isActive
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-zinc-700/30 text-zinc-400 border-zinc-700/40"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        isActive ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
      }`}
    />
    {isActive ? "Active" : "Closed"}
  </span>
);

// ─── Custom Toggle Pill ────────────────────────────────────────────────────────
// Built as a plain styled button — avoids all HeroUI Switch compound API issues.

/**
 * JobStatusSwitch
 * Optimistic toggle for a recruiter's job status (active ↔ closed).
 *
 * @param {{ job: Object }} props
 */
const JobStatusSwitch = ({ job }) => {
  const [isActive, setIsActive] = useState(job.status === "active");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    const prevState = isActive;
    const nextState = !isActive;

    // --- Optimistic update ---
    setIsActive(nextState);
    setIsPending(true);

    const newStatus = nextState ? "active" : "closed";
    const toastId = toast.loading(`Setting job to ${newStatus}…`);

    try {
      await updateJobStatusOrDetails(job._id, { status: newStatus });
      toast.success(`Job is now ${newStatus}.`, { id: toastId });
      router.refresh();
    } catch (err) {
      console.error("Status toggle error:", err);
      setIsActive(prevState); // revert on failure
      toast.error("Failed to update status. Please try again.", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Toggle pill */}
      <button
        id={`status-switch-${job._id}`}
        role="switch"
        aria-checked={isActive}
        aria-label={`Toggle status for ${job.jobTitle || "job"}`}
        onClick={handleToggle}
        disabled={isPending}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 ${
          isActive
            ? "bg-primary border-primary"
            : "bg-zinc-700 border-zinc-600"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isActive ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </button>

      {/* Status text badge */}
      <StatusBadge isActive={isActive} />
    </div>
  );
};

export default JobStatusSwitch;
