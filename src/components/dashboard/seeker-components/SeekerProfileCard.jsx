/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  FiEdit3,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiGlobe,
  FiFileText,
  FiUser,
  FiExternalLink,
  FiCode,
} from "react-icons/fi";
import SeekerProfileEditForm from "./SeekerProfileEditForm";
import Image from "next/image";

/**
 * SeekerProfileCard — Client Component
 * Toggles between view mode (seeker profile display) and edit mode (SeekerProfileEditForm).
 * Displays cover image, headline, bio, skills chips, resume drive link, portfolio link,
 * phone, address, and social links.
 */
const SeekerProfileCard = ({ seekerId, seekerProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  const profile = seekerProfile;

  // Address parsing
  const location = typeof profile?.address === "object"
    ? [profile.address.city, profile.address.country].filter(Boolean).join(", ")
    : profile?.address || "";

  // Social links formatting
  const socialObj = typeof profile?.socialLinks === "object" && !Array.isArray(profile.socialLinks)
    ? profile.socialLinks
    : {};

  const socialLinks = [
    {
      key: "linkedin",
      icon: <FiLinkedin className="text-[#0a66c2]" />,
      label: "LinkedIn",
      url: socialObj.linkedin,
    },
    {
      key: "github",
      icon: <FiGithub className="text-zinc-300" />,
      label: "GitHub",
      url: socialObj.github,
    },
    {
      key: "twitter",
      icon: <FiTwitter className="text-zinc-300" />,
      label: "Twitter / X",
      url: socialObj.twitter,
    },
    {
      key: "website",
      icon: <FiGlobe className="text-emerald-400" />,
      label: "Website",
      url: socialObj.website,
    },
  ].filter((s) => s.url);

  const hasAnySocial = socialLinks.length > 0;
  const skillsList = Array.isArray(profile?.skills) ? profile.skills : [];
  const resumeLink = profile?.resumeDriveLink || "";
  const portfolioLink = profile?.portfolioLink || profile?.portfolioUrl || "";

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col">
      {/* ── Cover Banner ── */}
      <div className="relative w-full h-36 shrink-0 overflow-hidden">
        {profile?.coverImage ? (
          <Image
            src={profile.coverImage}
            alt="Cover banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #061a14 0%, #0d281e 30%, #0b3425 60%, #081c16 100%)",
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
                  id="seeker-cover-dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#10b981" opacity="0.4" />
                </pattern>
                <linearGradient
                  id="seeker-cover-glow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="600" height="144" fill="url(#seeker-cover-dots)" />
              <ellipse
                cx="300"
                cy="72"
                rx="180"
                ry="50"
                fill="url(#seeker-cover-glow)"
              />
            </svg>

            <p className="absolute inset-0 flex items-center justify-center text-[11px] text-zinc-500 font-light tracking-widest uppercase pointer-events-none select-none">
              No cover image — click edit profile to upload
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-zinc-900/80 to-transparent" />
      </div>

      {/* ── Card Header ── */}
      <div className="px-6 pt-4 pb-3 border-b border-zinc-800/50 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
            Seeker Profile Details
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Visible to recruiters and hiring managers
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
          /* EDIT MODE */
          <SeekerProfileEditForm
            seekerId={seekerId}
            seekerProfile={profile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          /* VIEW MODE */
          <div className="flex flex-col gap-5">
            {/* Headline */}
            <div>
              {profile?.headline ? (
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {profile.headline}
                </h3>
              ) : (
                <p className="text-sm text-zinc-600 italic font-light">
                  No professional headline added yet — click &quot;Edit Profile&quot; to add one.
                </p>
              )}
            </div>

            {/* Bio */}
            {profile?.bio && (
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                  About Me
                </p>
                <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <FiCode className="text-emerald-400 text-xs" /> Skills &amp; Expertise
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {skillsList.map((skill, idx) => (
                    <span
                      key={`${skill}-${idx}`}
                      className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links Row (Resume Drive Link + Portfolio Link) */}
            {(resumeLink || portfolioLink) && (
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Documents &amp; Links
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Resume Drive Link */}
                  {resumeLink && (
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all group"
                    >
                      <FiFileText className="text-sm shrink-0" />
                      <span>Resume Drive Link</span>
                      <FiExternalLink className="text-xs shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}

                  {/* Portfolio Link */}
                  {portfolioLink && (
                    <a
                      href={portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 px-3.5 py-2 rounded-xl transition-all group"
                    >
                      <FiGlobe className="text-sm shrink-0 text-emerald-400" />
                      <span>Portfolio Link</span>
                      <FiExternalLink className="text-xs shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Info chips row (Phone & Address) */}
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
                  Social Links
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

            {/* Empty state when profile has no content */}
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
                    Add a headline, bio, skills, resume link, portfolio link, and social profiles to stand out to employers.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 px-6 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  Set Up Seeker Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerProfileCard;
