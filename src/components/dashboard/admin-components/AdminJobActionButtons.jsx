"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { deleteAdminJob } from "@/lib/actions/admin-action/jobActions";

/**
 * AdminJobActionButtons
 * Action buttons for each job row:
 *  - View Details button linking to /browse-jobs/details/:jobId
 *  - Delete Job button with AlertDialog confirmation modal calling deleteAdminJob action
 *
 * @param {{ job: Object }} props
 */
const AdminJobActionButtons = ({ job }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading(`Deleting job "${job?.jobTitle || "Job"}"…`);
    try {
      const res = await deleteAdminJob(job._id);
      if (res?.success === false) {
        throw new Error(res?.message || "Failed to delete job.");
      }
      setIsDeleteDialogOpen(false);
      toast.success(`Job "${job?.jobTitle || "Job"}" deleted successfully.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Delete job error:", err);
      toast.error(err.message || "Failed to delete job. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* View Job Details Button */}
      <Link
        href={`/browse-jobs/details/${job._id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
          text-zinc-300 bg-zinc-900 border border-zinc-800
          hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer"
        title="View Job Details"
      >
        <FiEye className="size-3.5 text-zinc-400" />
        <span>View</span>
      </Link>

      {/* Delete Job Button with AlertDialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialog.Trigger>
          <div
            id={`delete-job-${job._id}`}
            role="button"
            title="Delete Job"
            aria-label={`Delete ${job?.jobTitle || "job"}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              text-rose-400 bg-rose-500/10 border border-rose-500/20
              hover:bg-rose-500/20 hover:border-rose-500/30 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiTrash2 className="size-3.5" />
            <span>Delete</span>
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
                  <AlertDialog.Icon
                    status="danger"
                    className="text-rose-400 size-5"
                  />
                </div>
                <div>
                  <AlertDialog.Heading className="text-base font-bold text-white">
                    Delete Job Post
                  </AlertDialog.Heading>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    This action cannot be undone.
                  </p>
                </div>
              </AlertDialog.Header>

              {/* Body */}
              <AlertDialog.Body className="px-6 py-5">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <span className="text-white font-semibold">
                    &ldquo;{job?.jobTitle || "this job"}&rdquo;
                  </span>
                  {job?.companyName ? (
                    <>
                      {" "}posted by{" "}
                      <span className="text-white font-semibold">
                        {job.companyName}
                      </span>
                    </>
                  ) : null}
                  ? All related application references will be permanently removed.
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
                      Deleting…
                    </>
                  ) : (
                    "Confirm Delete"
                  )}
                </button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default AdminJobActionButtons;
