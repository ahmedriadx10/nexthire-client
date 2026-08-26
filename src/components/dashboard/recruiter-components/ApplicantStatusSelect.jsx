"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { updateApplicantStatus } from "@/lib/actions/recruiter-action/applicantActions";

const STATUS_CONFIG = {
  applied: {
    label: "Applied",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  },
  screening: {
    label: "Screening",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  },
  shortlisted: {
    label: "Shortlisted",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/25",
  },
  interview: {
    label: "Interview",
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
  },
  hired: {
    label: "Hired",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  },
  rejected: {
    label: "Rejected",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/25",
  },
};

/**
 * ApplicantStatusSelect
 * Custom status dropdown component for applicant table row.
 * Handles optimistic updates and triggers patch server action.
 *
 * @param {{ applicationId: string, initialStatus: string, applicantName?: string }} props
 */
const ApplicantStatusSelect = ({ applicationId, initialStatus = "applied", applicantName = "Applicant" }) => {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus?.toLowerCase() || "applied");
  const [isUpdating, setIsUpdating] = useState(false);

  const currentConfig = STATUS_CONFIG[status] || STATUS_CONFIG.applied;

  const handleStatusChange = async (e) => {
    const nextStatus = e.target.value;
    if (nextStatus === status || isUpdating) return;

    const previousStatus = status;
    setStatus(nextStatus);
    setIsUpdating(true);

    const toastId = toast.loading(`Updating status for ${applicantName}…`);

    try {
      await updateApplicantStatus(applicationId, nextStatus);
      toast.success(`Status updated to "${STATUS_CONFIG[nextStatus]?.label || nextStatus}"`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Status update error:", err);
      setStatus(previousStatus); // revert on error
      toast.error(err.message || "Failed to update status. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none text-xs font-bold border rounded-lg px-3 py-1.5 pr-7 focus:outline-none cursor-pointer transition-all duration-200 ${currentConfig.color} bg-zinc-950/60 hover:bg-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <option key={key} value={key} className="bg-zinc-900 text-zinc-200 py-1 font-medium">
            {config.label}
          </option>
        ))}
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

export default ApplicantStatusSelect;
