/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiShield,
  FiCreditCard,
  FiEdit3,
  FiCheck,
  FiX,
  FiUploadCloud,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { uploadToImgBB } from "@/lib/core/uploadToImgBB";
import {
  updateUserNameAndImage,
  resendVerificationEmail,
} from "@/lib/core/auth-user-client";
// import RecruiterEmailChangeModal from "./RecruiterEmailChangeModal";
// import RecruiterDeleteAccountDialog from "./RecruiterDeleteAccountDialog";

/**
 * RecruiterAccountCard — Client Component
 *
 * Interactive display + edit card for the recruiter's betterAuth account data:
 *  • Avatar upload (via ImgBB → betterAuth updateUser)
 *  • Inline name edit (via betterAuth updateUser)
 *  • Email verification badge (verified / unverified)
 *  • Resend verification email action
 *  • Change email (opens RecruiterEmailChangeModal)
 *  • Danger Zone — delete account (opens RecruiterDeleteAccountDialog)
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getInitials = (name) => {
  if (!name) return "RC";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0][0].toUpperCase();
};

const formatPlanLabel = (plan) => {
  if (!plan) return "Free Plan";
  return plan.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

// ─────────────────────────────────────────────────────────────────────────────

const RecruiterAccountCard = ({ recruiterData }) => {
  const router = useRouter();
  const avatarInputRef = useRef(null);

  const name = recruiterData?.name || "Recruiter";
  const email = recruiterData?.email || "";
  const image = recruiterData?.image || "";
  const role = recruiterData?.role || "recruiter";
  const plan = formatPlanLabel(recruiterData?.plan);
  const emailVerified = recruiterData?.emailVerified ?? false;

  // ── Local UI state ────────────────────────────────────────────────────────
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [isSavingName, setIsSavingName] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  // Modal states
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ── Avatar Upload ─────────────────────────────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const toastId = toast.loading("Uploading avatar…");

    try {
      const url = await uploadToImgBB(file);
      const { success, error } = await updateUserNameAndImage({ image: url });
      if (success) {
        toast.success("Avatar updated!", { id: toastId });
        router.refresh();
      } else {
        toast.error(error || "Failed to update avatar.", { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || "Upload failed.", { id: toastId });
    } finally {
      setIsUploadingAvatar(false);
      // Reset file input so same file can be re-selected if needed
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  // ── Name Edit ─────────────────────────────────────────────────────────────
  const handleNameSave = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed === name) {
      setIsEditingName(false);
      setNameInput(name);
      return;
    }

    setIsSavingName(true);
    const toastId = toast.loading("Updating name…");

    const { success, error } = await updateUserNameAndImage({ name: trimmed });
    if (success) {
      toast.success("Name updated!", { id: toastId });
      router.refresh();
      setIsEditingName(false);
    } else {
      toast.error(error || "Failed to update name.", { id: toastId });
    }
    setIsSavingName(false);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setNameInput(name);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") handleNameSave();
    if (e.key === "Escape") handleNameCancel();
  };

  // ── Resend Verification ───────────────────────────────────────────────────
  const handleResendVerification = async () => {
    if (!email) return;
    setIsResendingVerification(true);
    const toastId = toast.loading("Sending verification email…");

    const { success, error } = await resendVerificationEmail(
      email,
      "/dashboard/recruiter/settings",
    );

    if (success) {
      toast.success("Verification email sent! Check your inbox.", {
        id: toastId,
      });
    } else {
      toast.error(error || "Failed to send verification email.", {
        id: toastId,
      });
    }
    setIsResendingVerification(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col">
        {/* ── Card Header ── */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-800/50">
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
            Account Info
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Authentication &amp; identity settings
          </p>
        </div>

        {/* ── Avatar + Name Row ── */}
        <div className="px-6 py-6 flex items-center gap-4">
          {/* Avatar — clickable for upload */}
          <div className="relative shrink-0 ">
            <input
              ref={avatarInputRef}
              id="avatar-file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUploadingAvatar}
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shrink-0 shadow-lg shadow-black/30 group cursor-pointer disabled:cursor-not-allowed"
              aria-label="Change avatar"
              title="Click to change avatar"
            >
              {/* Avatar image / initials */}
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="64px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-linear-to-tr from-primary/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-xl font-black text-primary select-none">
                    {getInitials(name)}
                  </span>
                </div>
              )}

              {/* Upload overlay */}
              {isUploadingAvatar ? (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <Spinner size="sm" className="border-b-primary" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <FiUploadCloud className="text-white text-lg" />
                  <span className="text-[8px] text-white font-semibold tracking-wide">
                    CHANGE
                  </span>
                </div>
              )}
            </button>

            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-zinc-900 rounded-full" />
          </div>

          {/* Name + Badges */}
          <div className="min-w-0 flex-1">
            {isEditingName ? (
              /* ── Name Edit Mode ── */
              <div className="flex items-center gap-2">
                <input
                  id="name-edit-input"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  disabled={isSavingName}
                  autoFocus
                  className="flex-1 min-w-0 h-9 px-2.5 rounded-lg bg-[#141416] border border-primary/60 text-white text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleNameSave}
                  disabled={isSavingName}
                  className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                  aria-label="Save name"
                >
                  {isSavingName ? (
                    <Spinner size="sm" />
                  ) : (
                    <FiCheck className="text-sm stroke-[2.5]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNameCancel}
                  disabled={isSavingName}
                  className="w-8 h-8 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                  aria-label="Cancel name edit"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            ) : (
              /* ── Name View Mode ── */
              <div className="flex items-center gap-2 group/name">
                <h3 className="text-lg font-bold text-white tracking-tight truncate leading-tight">
                  {name}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setNameInput(name);
                    setIsEditingName(true);
                  }}
                  className="p-1 rounded-md text-zinc-600 hover:text-primary hover:bg-primary/10 opacity-0 group-hover/name:opacity-100 transition-all duration-150 cursor-pointer shrink-0"
                  aria-label="Edit name"
                  title="Edit name"
                >
                  <FiEdit3 className="text-xs stroke-[2.5]" />
                </button>
              </div>
            )}

            {/* Role + Plan badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full tracking-wide capitalize">
                <FiShield className="text-[9px]" />
                {role}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full tracking-wide">
                <FiCreditCard className="text-[9px]" />
                {plan}
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-zinc-800/50" />

        {/* ── Email Row ── */}
        <div className="px-6 py-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-zinc-800/60 border border-zinc-700/40 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <FiMail className="text-zinc-400 text-sm" />
          </div>
          <div className="min-w-0 flex-1">
            {/* Label + badge row */}
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Email Address
              </p>
              {/* Verification badge */}
              {emailVerified ? (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Unverified
                </span>
              )}
            </div>

            {/* Email value */}
            <p className="text-sm font-medium text-zinc-200 truncate">
              {email || "—"}
            </p>

{/* In future we will add these feature */}
            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2   mt-2.5">
              {/* Resend verification — only if unverified */}
              {/* {!emailVerified && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResendingVerification ? (
                    <Spinner size="sm" classNames="border-b-amber-400" />
                  ) : (
                    <FiRefreshCw className="text-[10px]" />
                  )}
                  {isResendingVerification ? "Sending…" : "Resend Verification"}
                </button>
              )} */}

              {/* Change email */}
              {/* <button
                type="button"
                onClick={() => setEmailModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/40 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
              >
                <FiEdit3 className="text-[10px]" />
                Change Email
              </button> */}
            </div>


          </div>
        </div>

        {/* ── Danger Zone ── */}
        {/* <div className="mx-6 mb-6 mt-2">
          <div className="px-4 py-4 bg-red-500/5 border border-red-500/15 rounded-xl flex flex-col md:flex-row md:justify-between lg:flex-col gap-3">
            <div>
              <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                Danger Zone
              </p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5 leading-relaxed">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="inline-flex items-center gap-2 text-[11px] font-bold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer w-fit"
            >
              <FiTrash2 className="text-xs" />
              Delete Account
            </button>
          </div>
        </div> */}
      </div>

      {/* ── Modals ── */}
      {/* <RecruiterEmailChangeModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        currentEmail={email}
        callbackURL="/dashboard/recruiter/settings"
      /> */}

      {/* <RecruiterDeleteAccountDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        userName={name}
        hasPassword={true}
        redirectTo="/"
      /> */}
    </>
  );
};

export default RecruiterAccountCard;
