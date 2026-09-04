/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiShield,
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
 * AdminAccountCard — Client Component
 *
 * Account management card for Platform Administrators:
 *  • Hero cover image banner (/images/admin-cover.png)
 *  • Avatar upload (via ImgBB → betterAuth updateUser)
 *  • Inline name edit (via betterAuth updateUser)
 *  • Admin Role badge display
 *  • Email address display
 *  • Informational note regarding future email verify/change & password security support
 */

const getInitials = (name) => {
  if (!name) return "AD";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0][0].toUpperCase();
};

const AdminAccountCard = ({ adminData }) => {
  const router = useRouter();
  const avatarInputRef = useRef(null);

  const name = adminData?.name || "System Admin";
  const email = adminData?.email || "";
  const image = adminData?.image || "";
  const role = adminData?.role || "admin";

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
    const toastId = toast.loading("Uploading admin avatar…");

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
      {/* ── Cover Banner ── */}
      <div className="relative w-full h-36 shrink-0 overflow-hidden bg-zinc-950">
        <Image
          src="/images/admin-cover.png"
          alt="Admin cover banner"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute top-3 right-4 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">
            Admin Account
          </span>
        </div>
      </div>

      {/* ── Card Header ── */}
      <div className="px-6 pt-4 pb-3 border-b border-zinc-800/50">
        <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
          Account Info
        </h2>
        <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
          Authentication &amp; administrative identity details
        </p>
      </div>

      {/* ── Avatar + Name Row ── */}
      <div className="px-6 py-6 flex items-center gap-4">
        {/* Avatar — clickable for upload */}
        <div className="relative shrink-0">
          <input
            ref={avatarInputRef}
            id="admin-avatar-input"
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
            className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shrink-0 shadow-lg shadow-black/40 group cursor-pointer disabled:cursor-not-allowed"
            aria-label="Change admin avatar"
            title="Click to change profile picture"
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
              <div className="w-full h-full bg-linear-to-tr from-red-600/30 via-rose-600/30 to-purple-600/30 flex items-center justify-center">
                <span className="text-xl font-black text-rose-400 select-none">
                  {getInitials(name)}
                </span>
              </div>
            )}

            {/* Upload overlay */}
            {isUploadingAvatar ? (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Spinner size="sm" className="border-b-rose-400" />
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

          {/* Admin online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 border-2 border-zinc-900 rounded-full" />
        </div>

        {/* Name + Badges */}
        <div className="min-w-0 flex-1">
          {isEditingName ? (
            /* Name Edit Mode */
            <div className="flex items-center gap-2">
              <input
                id="admin-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleNameKeyDown}
                disabled={isSavingName}
                autoFocus
                className="flex-1 min-w-0 h-9 px-2.5 rounded-lg bg-[#141416] border border-rose-500/60 text-white text-sm font-bold focus:outline-none focus:ring-1 focus:ring-rose-500/40 transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleNameSave}
                disabled={isSavingName}
                className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
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
                className="p-1 rounded-md text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover/name:opacity-100 transition-all duration-150 cursor-pointer shrink-0"
                aria-label="Edit name"
                title="Edit display name"
              >
                <FiEdit3 className="text-xs stroke-[2.5]" />
              </button>
            </div>
          )}

          {/* Role badge */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
              <FiShield className="text-[9px]" />
              {role}
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
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">
            Email Address
          </p>
          <p className="text-sm font-medium text-zinc-200 truncate">
            {email || "—"}
          </p>
        </div>
      </div>

      {/* ── Informational Note for Future Account Management Features ── */}
      <div className="mx-6 mb-6 mt-1">
        <div className="px-4 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-xl flex items-start gap-3">
          <FiInfo className="text-rose-400 text-base shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-zinc-300">
              Account Security &amp; Email Settings
            </p>
            <p className="text-[11px] text-zinc-500 font-light mt-0.5 leading-relaxed">
              Email verification, email change, and password/security management features for Admin accounts will be enabled in upcoming releases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountCard;
