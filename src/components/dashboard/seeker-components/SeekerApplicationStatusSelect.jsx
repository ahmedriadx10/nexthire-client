"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiChevronDown, FiAlertCircle } from "react-icons/fi";
import { updateSeekerApplicationStatus } from "@/lib/actions/seeker-action/seekerApplicationActions";

const STATUS_CONFIG = {
  applied: {
    label: "Applied",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  },
  screening: {
    label: "Screening",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
  },
  shortlisted: {
    label: "Shortlisted",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/25",
  },
  interview: {
    label: "Interview",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  },
  hired: {
    label: "Hired",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  },
  rejected: {
    label: "Rejected",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/25",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "bg-zinc-800/80 text-zinc-400 border-zinc-700/60",
  },
};

/**
 * SeekerApplicationStatusSelect Component
 * Displays status badge and allows job seeker to change status from 'applied' -> 'withdrawn'.
 *
 * @param {Object} props
 * @param {string} props.applicationId - Application ID.
 * @param {string} props.initialStatus - Initial application status.
 * @param {string} [props.jobName] - Job title for toast notification.
 */
const SeekerApplicationStatusSelect = ({
  applicationId,
  initialStatus = "applied",
  jobName = "Application",
}) => {
  const router = useRouter();
  const normalizedInitial = initialStatus?.toLowerCase() || "applied";
  const [status, setStatus] = useState(normalizedInitial);
  const [isUpdating, setIsUpdating] = useState(false);

  const currentConfig = STATUS_CONFIG[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    color: "bg-zinc-800/60 text-zinc-400 border-zinc-700/60",
  };

  // Seeker can only update if current status is "applied"
  const canSeekerUpdate = status === "applied";

  const handleStatusChange = async (e) => {
    const nextStatus = e.target.value;
    if (nextStatus === status || isUpdating) return;

    if (nextStatus !== "withdrawn" && nextStatus !== "applied") {
      toast.error("Seekers can only withdraw an active application.");
      return;
    }

    const previousStatus = status;
    setStatus(nextStatus);
    setIsUpdating(true);

    const toastId = toast.loading(`Updating application status...`);

    try {
      const res = await updateSeekerApplicationStatus(applicationId, nextStatus);
      if (res?.success === false) {
        throw new Error(res?.message || "Failed to update application status.");
      }

      toast.success(
        nextStatus === "withdrawn"
          ? `Application for "${jobName}" withdrawn successfully.`
          : `Status updated to "${STATUS_CONFIG[nextStatus]?.label || nextStatus}"`,
        { id: toastId }
      );
      router.refresh();
    } catch (err) {
      console.error("Status update error:", err);
      setStatus(previousStatus);
      toast.error(err.message || "Failed to update status. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!canSeekerUpdate) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${currentConfig.color}`}
      >
        {currentConfig.label}
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none text-xs font-bold border rounded-lg px-3 py-1.5 pr-7 focus:outline-none cursor-pointer transition-all duration-200 ${currentConfig.color} bg-zinc-950/60 hover:bg-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <option value="applied" className="bg-zinc-900 text-blue-400 py-1 font-medium">
          Applied
        </option>
        <option value="withdrawn" className="bg-zinc-900 text-zinc-400 py-1 font-medium">
          Withdrawn
        </option>
      </select>
      <div className="pointer-events-none absolute right-2 flex items-center">
        {isUpdating ? (
          <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70" />
        ) : (
          <FiChevronDown className="size-3.5 opacity-70" />
        )}
      </div>
    </div>
  );
};

export default SeekerApplicationStatusSelect;
