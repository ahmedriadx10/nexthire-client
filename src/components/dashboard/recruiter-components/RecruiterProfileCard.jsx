/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  FiEdit3,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiUser,
} from "react-icons/fi";
import RecruiterProfileEditForm from "./RecruiterProfileEditForm";

/**
 * RecruiterProfileCard — Client Component
 * Toggles between view mode (profile display) and edit mode (RecruiterProfileEditForm).
 * Handles the cover image banner (LinkedIn-style), headline, bio, phone,
 * address, and social links.
 */
const RecruiterProfileCard = ({ recruiterId, recruiterProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  const profile = recruiterProfile;

  // ─── Social link helpers ──────────────────────────────────────────────────
  const socialLinks = [
    {
      key: "linkedin",
      icon: <FiLinkedin className="text-[#0a66c2]" />,
      label: "LinkedIn",
      url: profile?.socialLinks?.linkedin,
    },
    {
      key: "facebook",
      icon: <FiFacebook className="text-[#1877f2]" />,
      label: "Facebook",
      url: profile?.socialLinks?.facebook,
    },
    {
      key: "twitter",
      icon: <FiTwitter className="text-zinc-300" />,
      label: "Twitter / X",
      url: profile?.socialLinks?.twitter,
    },
  ].filter((s) => s.url);

  const hasAnySocial = socialLinks.length > 0;
  const location = [profile?.address?.city, profile?.address?.country]
    .filter(Boolean)
    .join(", ");

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col">
      {/* ── Cover Banner ── */}
      <div className="relative w-full h-36 shrink-0 overflow-hidden">
        {profile?.coverImage ? (
          <img
            src={profile.coverImage}
            alt="Cover banner"
            className="w-full h-full object-cover"
          />
        ) : (
          /* Animated gradient placeholder */
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #0a0a0f 0%, #0d1520 30%, #0b1a2e 60%, #090f1a 100%)",
            }}
          >
            {/* Decorative dot grid */}
            <svg
              className="w-full h-full opacity-30"
              viewBox="0 0 600 144"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="cover-dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#3f3f46" opacity="0.5" />
                </pattern>
                <linearGradient id="cover-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary, #00a6fb)" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="var(--color-primary, #00a6fb)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="600" height="144" fill="url(#cover-dots)" />
              <ellipse cx="300" cy="72" rx="180" ry="50" fill="url(#cover-glow)" />
            </svg>

            <p className="absolute inset-0 flex items-center justify-center text-[11px] text-zinc-600 font-light tracking-widest uppercase pointer-events-none select-none">
              No cover image — add one in edit mode
            </p>
          </div>
        )}

        {/* Dark gradient overlay at bottom for readability */}
        <div className="absolute  inset-x-0 bottom-0 h-12 bg-linear-to-t from-zinc-900/80 to-transparent" />
      </div>

      {/* ── Card Header ── */}
      <div className="px-6 pt-4 pb-3 border-b border-zinc-800/50 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
            Profile Details
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Visible to candidates and hiring teams
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs font-semibold px-4 h-9 rounded-lg transition-all duration-200 cursor-pointer shrink-0 uppercase tracking-wider"
          >
            <FiEdit3 className="text-xs stroke-[2.5]" />
            Edit Profile
          </button>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-6 py-5 flex-1">
        {isEditing ? (
          /* ── EDIT MODE ── */
          <RecruiterProfileEditForm
            recruiterId={recruiterId}
            recruiterProfile={profile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          /* ── VIEW MODE ── */
          <div className="flex flex-col gap-5">
            {/* Headline */}
            <div>
              {profile?.headline ? (
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {profile.headline}
                </h3>
              ) : (
                <p className="text-sm text-zinc-600 italic font-light">
                  No headline yet — click &quot;Edit Profile&quot; to add one.
                </p>
              )}
            </div>

            {/* Bio */}
            {profile?.bio && (
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                  About
                </p>
                <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Info chips row */}
            {(profile?.phone || location) && (
              <div className="flex flex-wrap items-center gap-2.5">
                {profile?.phone && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/50 border border-zinc-700/40 px-3 py-1.5 rounded-full font-light">
                    <FiPhone className="text-zinc-500 text-[11px]" />
                    {profile.phone}
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/50 border border-zinc-700/40 px-3 py-1.5 rounded-full font-light">
                    <FiMapPin className="text-zinc-500 text-[11px]" />
                    {location}
                  </span>
                )}
              </div>
            )}

            {/* Social Links */}
            {hasAnySocial && (
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Social
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ key, icon, label, url }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/40 hover:border-zinc-600/60 px-3 py-1.5 rounded-full font-medium transition-all duration-150"
                    >
                      {icon}
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state (null profile) */}
            {!profile && (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center">
                  <FiUser className="text-zinc-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">
                    Your profile is empty
                  </p>
                  <p className="text-xs text-zinc-600 font-light mt-1 max-w-xs">
                    Add a headline, bio, contact info, and social links to stand
                    out to candidates.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 px-6 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  Set Up Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfileCard;
