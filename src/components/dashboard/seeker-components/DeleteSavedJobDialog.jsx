"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { deleteSavedSeekerJob } from "@/lib/actions/seeker-action/savedJobActions";

/**
 * DeleteSavedJobDialog
 * Confirmation dialog for removing a job from seeker's saved list.
 *
 * @param {Object} props
 * @param {string} props.userId - Logged in user ID.
 * @param {string} props.jobId - MongoDB _id of the saved job.
 * @param {string} props.jobName - Name of the job.
 * @param {boolean} [props.canApplyJob] - Whether the job is active / can apply.
 */
const DeleteSavedJobDialog = ({ userId, jobId, jobName, canApplyJob = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Removing job from saved list…");
    try {
      await deleteSavedSeekerJob({ userId, jobId });
      setIsOpen(false);
      toast.success(`"${jobName || "Job"}" removed from saved jobs.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Delete saved job error:", err);
      toast.error("Failed to remove job. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const actionText = canApplyJob ? "Unsave Job" : "Remove Job";

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger>
        <div
          id={`delete-saved-job-${jobId}`}
          title={actionText}
          aria-label={`${actionText} ${jobName || ""}`}
          role="button"
          className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
        >
          <FiTrash2 className="size-4" />
        </div>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog
            className="bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl
              shadow-2xl shadow-black/60 p-0 overflow-hidden max-w-md w-full"
          >
            {/* Header */}
            <AlertDialog.Header className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-zinc-800/60">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertDialog.Icon status="danger" className="text-rose-400 size-5" />
              </div>
              <div>
                <AlertDialog.Heading className="text-base font-bold text-white">
                  {actionText}
                </AlertDialog.Heading>
                <p className="text-xs text-zinc-500 mt-0.5">
                  This will remove the job from your saved jobs list.
                </p>
              </div>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="px-6 py-5">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Are you sure you want to remove{" "}
                <span className="text-white font-semibold">
                  &ldquo;{jobName || "this job"}&rdquo;
                </span>{" "}
                from your saved jobs list?
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="px-6 pb-6 flex justify-end gap-3">
              <Button
                slot="close"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-300
                  bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700
                  transition-all duration-200 cursor-pointer"
              >
                Cancel
              </Button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                  bg-rose-600 hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Removing…
                  </>
                ) : (
                  actionText
                )}
              </button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteSavedJobDialog;
