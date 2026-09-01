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
  FiInfo,
} from "react-icons/fi";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { uploadToImgBB } from "@/lib/core/uploadToImgBB";
import { updateUserNameAndImage } from "@/lib/core/auth-user-client";

/**
 * SeekerAccountCard — Client Component
 *
 * Account management card for Job Seekers:
 *  • Avatar upload (via ImgBB → betterAuth updateUser)
 *  • Inline name edit (via betterAuth updateUser)
 *  • Role + Plan badges
 *  • Email address display + verification status badge
 *  • Informational note regarding future email verify/change & account delete support
 */

const getInitials = (name) => {
  if (!name) return "SK";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0][0].toUpperCase();
};

const formatPlanLabel = (plan) => {
  if (!plan) return "Free Plan";
  return plan.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const SeekerAccountCard = ({ seekerData }) => {
  const router = useRouter();
  const avatarInputRef = useRef(null);

  const name = seekerData?.name || "Job Seeker";
  const email = seekerData?.email || "";
  const image = seekerData?.image || "";
  const role = seekerData?.role || "seeker";
  const plan = formatPlanLabel(seekerData?.plan);
  const emailVerified = seekerData?.emailVerified ?? false;

  // ── Local UI state ────────────────────────────────────────────────────────
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [isSavingName, setIsSavingName] = useState(false);

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

  return (
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
        <div className="relative shrink-0">
          <input
            ref={avatarInputRef}
            id="seeker-avatar-input"
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
              <div className="w-full h-full bg-linear-to-tr from-emerald-600/30 to-teal-600/30 flex items-center justify-center">
                <span className="text-xl font-black text-emerald-400 select-none">
                  {getInitials(name)}
                </span>
              </div>
            )}

            {/* Upload overlay */}
            {isUploadingAvatar ? (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Spinner size="sm" className="border-b-emerald-400" />
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

          {/* Active status indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-zinc-900 rounded-full" />
        </div>

        {/* Name + Badges */}
        <div className="min-w-0 flex-1">
          {isEditingName ? (
            /* Name Edit Mode */
            <div className="flex items-center gap-2">
              <input
                id="seeker-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleNameKeyDown}
                disabled={isSavingName}
                autoFocus
                className="flex-1 min-w-0 h-9 px-2.5 rounded-lg bg-[#141416] border border-emerald-500/60 text-white text-sm font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleNameSave}
                disabled={isSavingName}
                className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
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
            /* Name View Mode */
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
                className="p-1 rounded-md text-zinc-600 hover:text-emerald-400 hover:bg-emerald-500/10 opacity-0 group-hover/name:opacity-100 transition-all duration-150 cursor-pointer shrink-0"
                aria-label="Edit name"
                title="Edit name"
              >
                <FiEdit3 className="text-xs stroke-[2.5]" />
              </button>
            </div>
          )}

          {/* Role + Plan badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full tracking-wide capitalize">
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
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              Email Address
            </p>
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
          <p className="text-sm font-medium text-zinc-200 truncate">
            {email || "—"}
          </p>
        </div>
      </div>

      {/* ── Informational Note for Future Account Management Features ── */}
      <div className="mx-6 mb-6 mt-1">
        <div className="px-4 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-xl flex items-start gap-3">
          <FiInfo className="text-emerald-400 text-base shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-zinc-300">
              Account Security &amp; Email Settings
            </p>
            <p className="text-[11px] text-zinc-500 font-light mt-0.5 leading-relaxed">
              Email verification, email change, and account deletion options for job seekers will be enabled in an upcoming release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerAccountCard;
