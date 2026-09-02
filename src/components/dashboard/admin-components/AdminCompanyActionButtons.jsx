"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { updateAdminCompanyStatus } from "@/lib/actions/admin-action/companyActions";

/**
 * AdminCompanyActionButtons
 * Conditional status action buttons:
 *  - Approve (if status is pending or rejected)
 *  - Reject (if status is pending or approved) — with AlertDialog confirmation
 *
 * @param {{ company: Object }} props
 */
const AdminCompanyActionButtons = ({ company }) => {
  const [isPendingAction, setIsPendingAction] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const router = useRouter();

  const currentStatus = company.status?.toLowerCase() || "pending";
  const canApprove = currentStatus === "pending" || currentStatus === "rejected";
  const canReject = currentStatus === "pending" || currentStatus === "approved";

  const handleApprove = async () => {
    setIsPendingAction(true);
    const toastId = toast.loading(`Approving "${company.name || "Company"}"…`);
    try {
      await updateAdminCompanyStatus(company._id, { status: "approved" });
      toast.success(`"${company.name || "Company"}" has been approved.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Approve company error:", err);
      toast.error("Failed to approve company. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsPendingAction(false);
    }
  };

  const handleReject = async () => {
    setIsPendingAction(true);
    const toastId = toast.loading(`Rejecting "${company.name || "Company"}"…`);
    try {
      await updateAdminCompanyStatus(company._id, { status: "rejected" });
      setIsRejectDialogOpen(false);
      toast.success(`"${company.name || "Company"}" has been rejected.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Reject company error:", err);
      toast.error("Failed to reject company. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsPendingAction(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Approve Button */}
      {canApprove && (
        <button
          id={`approve-company-${company._id}`}
          onClick={handleApprove}
          disabled={isPendingAction}
          title="Approve Company"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
            text-emerald-400 bg-emerald-500/10 border border-emerald-500/20
            hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiCheckCircle className="size-3.5" />
          <span>Approve</span>
        </button>
      )}

      {/* Reject Button with AlertDialog */}
      {canReject && (
        <AlertDialog
          isOpen={isRejectDialogOpen}
          onOpenChange={setIsRejectDialogOpen}
        >
          <AlertDialog.Trigger>
            <div
              id={`reject-company-${company._id}`}
              role="button"
              title="Reject Company"
              aria-label={`Reject ${company.name || "company"}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                text-rose-400 bg-rose-500/10 border border-rose-500/20
                hover:bg-rose-500/20 hover:border-rose-500/30 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiXCircle className="size-3.5" />
              <span>Reject</span>
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
                      Reject Company
                    </AlertDialog.Heading>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      This will remove the company from public listings.
                    </p>
                  </div>
                </AlertDialog.Header>

                {/* Body */}
                <AlertDialog.Body className="px-6 py-5">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Are you sure you want to reject{" "}
                    <span className="text-white font-semibold">
                      &ldquo;{company.name || "this company"}&rdquo;
                    </span>
                    ? The recruiter will not be able to list public job openings for this company until approved again.
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
                    onClick={handleReject}
                    disabled={isPendingAction}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                      bg-rose-600 hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    {isPendingAction ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Rejecting…
                      </>
                    ) : (
                      "Confirm Reject"
                    )}
                  </button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
};

export default AdminCompanyActionButtons;
