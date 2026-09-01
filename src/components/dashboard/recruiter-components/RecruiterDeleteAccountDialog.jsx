"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { FiAlertTriangle, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteUserAccount } from "@/lib/core/auth-user-client";

/**
 * RecruiterDeleteAccountDialog
 *
 * Reusable danger-zone dialog for permanently deleting a betterAuth user account.
 * For credential (email+password) users: requires current password entry.
 * For OAuth-only (Google, etc.) users: password field is hidden.
 *
 * Props:
 *  - isOpen        {boolean}   Whether the dialog is visible.
 *  - onClose       {function}  Called when the dialog should close.
 *  - userName      {string}    Display name shown in the warning copy.
 *  - hasPassword   {boolean}   Whether to show the password confirmation field.
 *  - redirectTo    {string}    Path to redirect to after deletion. Default: "/".
 */
const RecruiterDeleteAccountDialog = ({
  isOpen,
  onClose,
  userName = "your account",
  hasPassword = true,
  redirectTo = "/",
}) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!confirmed) {
      toast.error("Please check the confirmation checkbox first.");
      return;
    }
    if (hasPassword && !password.trim()) {
      toast.error("Please enter your current password to confirm.");
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading("Deleting your account…");

    const { success, error } = await deleteUserAccount({
      password: hasPassword ? password : undefined,
      callbackURL: redirectTo,
    });

    if (success) {
      toast.success("Account deleted successfully.", { id: toastId });
      onClose();
      // used for refresh js bundle if any problem comes in future we will try different approach
      router.refresh();
      setTimeout(() => router.push(redirectTo), 800);
    } else {
      toast.error(error || "Failed to delete account. Please try again.", {
        id: toastId,
      });
      setIsDeleting(false);
    }
  };

  // ── Reset on close ────────────────────────────────────────────────────────
  const handleClose = () => {
    if (isDeleting) return;
    setPassword("");
    setShowPassword(false);
    setConfirmed(false);
    setIsDeleting(false);
    onClose();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <AlertDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <AlertDialog.Backdrop variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-zinc-900 border border-red-500/20 rounded-2xl shadow-2xl shadow-black/60 max-w-md w-full p-0 overflow-hidden">
            {/* ── Header ── */}
            <AlertDialog.Header className="px-6 pt-6 pb-4 border-b border-zinc-800/50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <AlertDialog.Icon
                  status="danger"
                  className="text-red-400 size-4"
                />
              </div>
              <div>
                <AlertDialog.Heading className="text-white font-bold text-base leading-tight">
                  Delete Account
                </AlertDialog.Heading>
                <p className="text-red-400/70 text-xs font-light mt-0.5">
                  This action is irreversible
                </p>
              </div>
            </AlertDialog.Header>

            {/* ── Body ── */}
            <AlertDialog.Body className="px-6 py-6 flex flex-col gap-5">
              {/* Warning block */}
              <div className="px-4 py-4 rounded-xl bg-red-500/5 border border-red-500/15 flex flex-col gap-2">
                <p className="text-sm text-red-300 font-semibold">
                  You are about to permanently delete your account.
                </p>
                <ul className="text-[12px] text-zinc-400 font-light leading-relaxed list-disc list-inside space-y-1">
                  <li>All your profile data and settings will be erased</li>
                  <li>Your job postings and applications will be removed</li>
                  <li>This cannot be undone — there is no recovery option</li>
                </ul>
              </div>

              {/* Password field (credential users only) */}
              {hasPassword && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                    Enter your password to confirm
                  </label>
                  <div className="flex h-11 rounded-xl overflow-hidden border border-zinc-800 bg-[#141416] focus-within:border-red-500/60 focus-within:ring-1 focus-within:ring-red-500/20 transition-all duration-200">
                    <input
                      id="delete-password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your current password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isDeleting}
                      autoComplete="current-password"
                      className="flex-1 h-full px-3 bg-transparent text-white placeholder-zinc-600 text-sm font-light focus:outline-none disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={isDeleting}
                      className="px-3 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-sm" />
                      ) : (
                        <FiEye className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    id="delete-confirm-checkbox"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    disabled={isDeleting}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                      ${
                        confirmed
                          ? "bg-red-500 border-red-500"
                          : "bg-transparent border-zinc-600 group-hover:border-zinc-400"
                      }`}
                  >
                    {confirmed && (
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[12px] text-zinc-400 font-light leading-relaxed">
                  I understand that deleting{" "}
                  <span className="text-zinc-200 font-medium">{userName}</span>{" "}
                  is permanent and cannot be reversed.
                </span>
              </label>
            </AlertDialog.Body>

            {/* ── Footer ── */}
            <AlertDialog.Footer className="px-6 pb-6 pt-4 border-t border-zinc-800/50 flex items-center justify-end gap-3">
              <Button
                slot="close"
                disabled={isDeleting}
                onClick={handleClose}
                className="px-5 h-10 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  isDeleting || !confirmed || (hasPassword && !password.trim())
                }
                className="flex items-center gap-2 px-6 h-10 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-900/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isDeleting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <FiTrash2 className="stroke-2" />
                )}
                {isDeleting ? "Deleting…" : "Delete My Account"}
              </button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default RecruiterDeleteAccountDialog;
