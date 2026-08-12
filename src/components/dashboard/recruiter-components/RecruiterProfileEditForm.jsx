/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Spinner,
} from "@heroui/react";
import {
  FiUploadCloud,
  FiX,
  FiUser,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiType,
  FiAlignLeft,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToImgBB } from "@/lib/core/uploadToImgBB";
import { updateRecruiterProfile } from "@/lib/actions/recruiter-action/recruiterProfileActions";

/**
 * RecruiterProfileEditForm
 * Inline edit form for recruiterProfile fields.
 * Calls PATCH /recruiter/profile/:id via the updateRecruiterProfile server action.
 */
const RecruiterProfileEditForm = ({ recruiterId, recruiterProfile, onCancel }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const [formData, setFormData] = useState({
    headline: recruiterProfile?.headline || "",
    bio: recruiterProfile?.bio || "",
    phone: recruiterProfile?.phone || "",
    city: recruiterProfile?.address?.city || "",
    country: recruiterProfile?.address?.country || "",
    coverImage: recruiterProfile?.coverImage || "",
    linkedin: recruiterProfile?.socialLinks?.linkedin || "",
    facebook: recruiterProfile?.socialLinks?.facebook || "",
    twitter: recruiterProfile?.socialLinks?.twitter || "",
  });

  // ─── Cover Image Upload ───────────────────────────────────────────────────

  const handleCoverUpload = async (file) => {
    if (!file) return;
    setIsUploadingCover(true);
    const toastId = toast.loading("Uploading cover image…");
    try {
      const url = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
      toast.success("Cover image uploaded!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Failed to upload image.", { id: toastId });
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) handleCoverUpload(e.target.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragActive(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files?.[0]) handleCoverUpload(e.dataTransfer.files[0]);
  };

  // ─── Form Submit ──────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      headline: formData.headline.trim(),
      bio: formData.bio.trim(),
      phone: formData.phone.trim(),
      coverImage: formData.coverImage,
      address: {
        city: formData.city.trim(),
        country: formData.country.trim(),
      },
      socialLinks: {
        linkedin: formData.linkedin.trim(),
        facebook: formData.facebook.trim(),
        twitter: formData.twitter.trim(),
      },
    };

    const toastId = toast.loading("Saving profile…");

    try {
      await updateRecruiterProfile(recruiterId, payload);
      toast.success("Profile updated successfully!", { id: toastId });
      router.refresh();
      onCancel(); // return to view mode after save
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Field helper ────────────────────────────────────────────────────────

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value })),
  });

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* ── Cover Image Upload ── */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
          Cover / Banner Image
        </span>

        {/* Preview */}
        {formData.coverImage && (
          <div className="relative w-full h-28 rounded-xl overflow-hidden border border-zinc-800 mb-1 group">
            <img
              src={formData.coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, coverImage: "" }))}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Remove cover image"
            >
              <FiX className="text-sm" />
            </button>
          </div>
        )}

        {/* Drop Zone */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-2 h-20 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 select-none
            ${isDragActive
              ? "border-primary/80 bg-primary/5 scale-[1.01]"
              : "border-zinc-700/60 bg-zinc-800/20 hover:border-zinc-600 hover:bg-zinc-800/40"
            }
            ${isUploadingCover ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {isUploadingCover ? (
            <Spinner size="sm" className="text-primary" />
          ) : (
            <>
              <FiUploadCloud className="text-zinc-500 text-xl" />
              <p className="text-xs text-zinc-500 font-light">
                Drag &amp; drop or{" "}
                <span className="text-primary font-semibold">browse</span>
                {" "}— max 5 MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Headline ── */}
      <TextField name="headline" className="flex flex-col gap-1.5">
        <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
          <FiType className="text-zinc-600" /> Headline
        </Label>
        <Input
          placeholder="e.g. Senior Talent Acquisition Specialist"
          className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          {...field("headline")}
        />
        <FieldError className="text-[10px] text-red-400 mt-0.5 font-medium" />
      </TextField>

      {/* ── Bio ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
          <FiAlignLeft className="text-zinc-600" /> Bio
        </label>
        <textarea
          name="bio"
          rows={4}
          placeholder="Tell candidates a bit about yourself and your hiring philosophy…"
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light resize-none"
        />
      </div>

      {/* ── Phone ── */}
      <TextField name="phone" className="flex flex-col gap-1.5">
        <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
          <FiPhone className="text-zinc-600" /> Phone
        </Label>
        <Input
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          {...field("phone")}
        />
        <FieldError className="text-[10px] text-red-400 mt-0.5 font-medium" />
      </TextField>

      {/* ── Address: City + Country ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField name="city" className="flex flex-col gap-1.5">
          <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
            <FiMapPin className="text-zinc-600" /> City
          </Label>
          <Input
            placeholder="e.g. San Francisco"
            className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
            {...field("city")}
          />
          <FieldError className="text-[10px] text-red-400 mt-0.5 font-medium" />
        </TextField>

        <TextField name="country" className="flex flex-col gap-1.5">
          <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
            <FiUser className="text-zinc-600" /> Country
          </Label>
          <Input
            placeholder="e.g. United States"
            className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
            {...field("country")}
          />
          <FieldError className="text-[10px] text-red-400 mt-0.5 font-medium" />
        </TextField>
      </div>

      {/* ── Social Links ── */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
          Social Links
        </span>

        {/* LinkedIn */}
        <div className="flex h-10 rounded-lg overflow-hidden border border-zinc-800 bg-[#141416]/90 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all">
          <span className="flex items-center px-3 bg-zinc-900 border-r border-zinc-800 text-[#0a66c2] text-sm select-none shrink-0">
            <FiLinkedin />
          </span>
          <input
            type="url"
            placeholder="linkedin.com/in/yourprofile"
            value={formData.linkedin}
            onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
            className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
          />
        </div>

        {/* Facebook */}
        <div className="flex h-10 rounded-lg overflow-hidden border border-zinc-800 bg-[#141416]/90 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all">
          <span className="flex items-center px-3 bg-zinc-900 border-r border-zinc-800 text-[#1877f2] text-sm select-none shrink-0">
            <FiFacebook />
          </span>
          <input
            type="url"
            placeholder="facebook.com/yourprofile"
            value={formData.facebook}
            onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
            className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
          />
        </div>

        {/* Twitter / X */}
        <div className="flex h-10 rounded-lg overflow-hidden border border-zinc-800 bg-[#141416]/90 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all">
          <span className="flex items-center px-3 bg-zinc-900 border-r border-zinc-800 text-zinc-300 text-sm select-none shrink-0">
            <FiTwitter />
          </span>
          <input
            type="url"
            placeholder="x.com/yourhandle"
            value={formData.twitter}
            onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
            className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
          />
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800/50">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 h-10 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || isUploadingCover}
          className="flex items-center gap-2 px-6 h-10 rounded-lg bg-primary hover:bg-primary/90 text-zinc-950 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isSubmitting ? (
            <Spinner size="sm" />
          ) : (
            <FiCheck className="stroke-[2.5]" />
          )}
          {isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </Form>
  );
};

export default RecruiterProfileEditForm;
