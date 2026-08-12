"use client";

import { useState } from "react";
import { Modal, Button, Spinner } from "@heroui/react";
import { FiMail, FiArrowRight, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { changeUserEmail } from "@/lib/core/auth-user-client";

/**
 * RecruiterEmailChangeModal
 *
 * Reusable modal for initiating a betterAuth email-change request.
 * Step 1 — form: user enters new email and submits.
 * Step 2 — confirmation: informs user to check inbox.
 *
 * Props:
 *  - isOpen       {boolean}   Whether the modal is visible.
 *  - onClose      {function}  Called when the modal should close.
 *  - currentEmail {string}    The user's current email (shown for reference).
 *  - callbackURL  {string}    URL betterAuth redirects to after verification.
 */
const RecruiterEmailChangeModal = ({
  isOpen,
  onClose,
  currentEmail = "",
  callbackURL = "/dashboard/recruiter/settings",
}) => {
  const [step, setStep] = useState("form"); // "form" | "sent"
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  // ── Validation ────────────────────────────────────────────────────────────
  const validateEmail = (email) => {
    if (!email.trim()) return "Please enter an email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (email.trim().toLowerCase() === currentEmail.toLowerCase())
      return "New email must be different from your current email.";
    return "";
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(newEmail);
    if (validationError) {
      setFieldError(validationError);
      return;
    }
    setFieldError("");
    setIsSubmitting(true);

    const toastId = toast.loading("Sending verification email…");
    const { success, error } = await changeUserEmail(newEmail.trim(), callbackURL);

    if (success) {
      toast.success("Verification email sent!", { id: toastId });
      setStep("sent");
    } else {
      toast.error(error || "Something went wrong. Please try again.", { id: toastId });
    }
    setIsSubmitting(false);
  };

  // ── Reset on close ────────────────────────────────────────────────────────
  const handleClose = () => {
    setStep("form");
    setNewEmail("");
    setFieldError("");
    setIsSubmitting(false);
    onClose();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <Modal.Backdrop variant="blur">
      <Modal.Container>
        <Modal.Dialog
          className="bg-zinc-900 border border-zinc-800/60 rounded-2xl shadow-2xl shadow-black/60 max-w-md w-full p-0 overflow-hidden"
        >
          {/* ── Header ── */}
          <Modal.Header className="px-6 pt-6 pb-4 border-b border-zinc-800/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FiMail className="text-primary text-base" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">Change Email Address</p>
                {step === "form" && (
                  <p className="text-zinc-500 text-xs font-light mt-0.5">
                    Current: <span className="text-zinc-400">{currentEmail || "—"}</span>
                  </p>
                )}
              </div>
            </div>
            {/* <Modal.CloseTrigger
              className="text-zinc-500 hover:text-white cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-zinc-800"
              onClick={handleClose}
            >
              <FiX className="text-sm" />
            </Modal.CloseTrigger> */}
          </Modal.Header>

          {/* ── Body ── */}
          <Modal.Body className="px-6 py-6">
            {step === "form" ? (
              /* ── Step 1: Form ── */
              <form id="email-change-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Enter your new email address below. We&apos;ll send a confirmation link to the
                  new address — the change takes effect only after you verify it.
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                    New Email Address
                  </label>
                  <div
                    className={`flex h-11 rounded-xl overflow-hidden border transition-all duration-200
                      ${fieldError
                        ? "border-red-500/60 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/50"
                        : "border-zinc-800 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/30"
                      } bg-[#141416]`}
                  >
                    <span className="flex items-center px-3 text-zinc-600 shrink-0">
                      <FiMail className="text-sm" />
                    </span>
                    <input
                      id="new-email-input"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                        if (fieldError) setFieldError("");
                      }}
                      disabled={isSubmitting}
                      className="flex-1 h-full bg-transparent text-white placeholder-zinc-600 text-sm font-light focus:outline-none pr-3 disabled:opacity-60"
                    />
                  </div>
                  {fieldError && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-0.5 font-medium">
                      <FiAlertCircle className="text-xs shrink-0" />
                      {fieldError}
                    </p>
                  )}
                </div>

                {/* Session freshness note */}
                <div className="px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <p className="text-[11px] text-amber-400/80 font-light leading-relaxed">
                    <span className="font-semibold text-amber-400">Note:</span> For security, this
                    action requires a recent sign-in. If you get a session error, please sign out
                    and sign back in before changing your email.
                  </p>
                </div>
              </form>
            ) : (
              /* ── Step 2: Confirmation ── */
              <div className="flex flex-col items-center text-center gap-5 py-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <FiCheckCircle className="text-emerald-400 text-3xl" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white font-bold text-base">Verification email sent!</p>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xs">
                    We&apos;ve sent a confirmation link to{" "}
                    <span className="text-white font-semibold">{newEmail}</span>. Please check your
                    inbox and click the link to complete the email change.
                  </p>
                </div>
                <div className="w-full px-4 py-3 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                  <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                    Didn&apos;t receive the email? Check your spam folder. The link expires in 1
                    hour. You can request a new one by submitting this form again.
                  </p>
                </div>
              </div>
            )}
          </Modal.Body>

          {/* ── Footer ── */}
          <Modal.Footer className="px-6 pb-6 pt-4 border-t border-zinc-800/50 flex items-center justify-end gap-3">
            <Button
              type="button"
              slot="close"
              onClick={handleClose}
              className="px-5 h-10 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              {step === "sent" ? "Close" : "Cancel"}
            </Button>

            {step === "form" && (
              <button
                type="submit"
                form="email-change-form"
                disabled={isSubmitting || !newEmail.trim()}
                className="flex items-center gap-2 px-6 h-10 rounded-lg bg-primary hover:bg-primary/90 text-zinc-950 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                ) : (
                  <FiArrowRight className="stroke-[2.5]" />
                )}
                {isSubmitting ? "Sending…" : "Send Verification"}
              </button>
            )}
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default RecruiterEmailChangeModal;
