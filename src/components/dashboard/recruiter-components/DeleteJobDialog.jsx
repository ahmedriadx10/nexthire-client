"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { deleteRecruiterJob } from "@/lib/actions/recruiter-action/jobActions";

/**
 * DeleteJobDialog
 * Confirmation alert dialog for permanently deleting a recruiter's job post.
 * Uses HeroUI AlertDialog with controlled isOpen state so we can close it
 * programmatically after a successful deletion.
 *
 * @param {{ job: Object }} props
 */
const DeleteJobDialog = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting job…");
    try {
      await deleteRecruiterJob(job._id);
      setIsOpen(false); // close dialog on success
      toast.success(`"${job.jobTitle || "Job"}" deleted successfully.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Delete job error:", err);
      toast.error("Failed to delete the job. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* ── Trigger ────────────────────────────────────────────────── */}
      {/* AlertDialog.Trigger wraps in Pressable internally — use a div,
          not a button, to avoid the "PressResponder without pressable child" warning */}
      <AlertDialog.Trigger>
        <div
          id={`delete-job-${job._id}`}
          title="Delete job"
          aria-label={`Delete ${job.jobTitle || "job"}`}
          role="button"
          className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
        >
          <FiTrash2 className="size-4" />
        </div>
      </AlertDialog.Trigger>

      {/* ── Dialog ─────────────────────────────────────────────────── */}
      <AlertDialog.Backdrop variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog
            className="bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl
              shadow-2xl shadow-black/60 p-0 overflow-hidden max-w-md w-full"
          >
            {/* Header */}
            <AlertDialog.Header className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-zinc-800/60">
              {/* Danger icon */}
              <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertDialog.Icon status="danger" className="text-rose-400 size-5" />
              </div>
              <div>
                <AlertDialog.Heading className="text-base font-bold text-white">
                  Delete Job Post
                </AlertDialog.Heading>
                <p className="text-xs text-zinc-500 mt-0.5">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="px-6 py-5">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="text-white font-semibold">
                  &ldquo;{job.jobTitle || "this job"}&rdquo;
                </span>
                ? All associated applicant data will also be removed.
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="px-6 pb-6 flex justify-end gap-3">
              {/* Cancel — slot="close" is the react-aria convention for dismissing
                  a dialog from within; gives us full control of label + styling */}
              <Button
                slot="close"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-300
                  bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700
                  transition-all duration-200 cursor-pointer"
              >
                Cancel
              </Button>

              {/* Delete button — closes dialog programmatically on success */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                  bg-rose-600 hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    {/* Simple inline spinner — avoids HeroUI Spinner theming issues */}
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting…
                  </>
                ) : (
                  "Delete Job"
                )}
              </button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteJobDialog;
