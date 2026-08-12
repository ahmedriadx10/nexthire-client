import Image from "next/image";
import { FiMail, FiShield, FiCreditCard } from "react-icons/fi";

/**
 * RecruiterAccountCard — Server Component
 * Read-only display of the recruiter's betterAuth account data:
 * name, email, avatar, role badge, plan badge.
 *
 * Future: edit (name, email, avatar) will be wired via betterAuth.
 */

const getInitials = (name) => {
  if (!name) return "RC";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const formatPlanLabel = (plan) => {
  if (!plan) return "Free Plan";
  return plan
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const RecruiterAccountCard = ({ recruiterData }) => {
  const name = recruiterData?.name || "Recruiter";
  const email = recruiterData?.email || "";
  const image = recruiterData?.image || "";
  const role = recruiterData?.role || "recruiter";
  const plan = formatPlanLabel(recruiterData?.plan);

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
      {/* Card Header */}
      <div className="px-6 pt-6 pb-4 border-b border-zinc-800/50">
        <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">
          Account Info
        </h2>
        <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
          Managed via your authentication provider
        </p>
      </div>

      {/* Avatar + Name Row */}
      <div className="px-6 py-6 flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 shrink-0 shadow-lg shadow-black/30">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
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

          {/* Online indicator */}
          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-800 rounded-full" />
        </div>

        {/* Name + Badges */}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-white tracking-tight truncate leading-tight">
            {name}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {/* Role badge */}
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full tracking-wide capitalize">
              <FiShield className="text-[9px]" />
              {role}
            </span>

            {/* Plan badge */}
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full tracking-wide">
              <FiCreditCard className="text-[9px]" />
              {plan}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800/50" />

      {/* Email Row */}
      <div className="px-6 py-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-zinc-800/60 border border-zinc-700/40 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <FiMail className="text-zinc-400 text-sm" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">
            Email Address
          </p>
          <p className="text-sm font-medium text-zinc-200 truncate">{email || "—"}</p>
        </div>
      </div>

      {/* Future edit hint */}
      <div className="mx-6 mb-6 mt-1 px-4 py-3 bg-zinc-800/30 border border-zinc-700/30 rounded-xl">
        <p className="text-[10px] text-zinc-600 font-light leading-relaxed">
          ✦ &nbsp;Avatar, name &amp; email editing will be available in a future update.
        </p>
      </div>
    </div>
  );
};

export default RecruiterAccountCard;
