"use client";

import {
  FiAward,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiFileText,
  FiHeart,
  FiHelpCircle,
  FiInfo,
  FiLayers,
  FiLock,
  FiMessageSquare,
  FiSend,
  FiStar,
  FiTrendingUp,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";

/**
 * SeekerBillingSkeleton — Client Component
 *
 * Industry-standard plan management & billing page skeleton for Job Seekers
 * during NextHire's development & free early-access phase.
 */

const upcomingSeekerPerks = [
  {
    icon: <FiStar className="text-amber-400 text-lg" />,
    title: "Candidate Profile Spotlight",
    desc: "Get featured at the top of recruiter talent searches to attract 3x more views and interview invitations.",
    status: "Upcoming Perk",
  },
  {
    icon: <FiMessageSquare className="text-purple-400 text-lg" />,
    title: "Direct Recruiter InMail",
    desc: "Send direct priority messages to hiring managers and recruiters for jobs you've applied to.",
    status: "In Development",
  },
  {
    icon: <FiZap className="text-emerald-400 text-lg" />,
    title: "AI Resume & Skill Gap Match",
    desc: "Get deep AI analysis comparing your resume against job posts with actionable skill gap recommendations.",
    status: "Planned",
  },
  {
    icon: <FiTrendingUp className="text-blue-400 text-lg" />,
    title: "Salary Benchmarking Reports",
    desc: "Access real-time compensation insights, peer salary comparisons, and negotiation benchmarking.",
    status: "Planned",
  },
];

const SeekerBillingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12 select-none space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Membership &amp; Subscription
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <FiClock className="text-xs" /> Early Access
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            View your job seeker account plan, active application perks, and payment history.
          </p>
        </div>
      </div>

      {/* ── Early Access Promotional Banner ──────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-zinc-900/40 border border-emerald-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <FiHeart className="text-emerald-400 text-xl" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  100% Free For Job Seekers
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                  Always Free Core Access
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Searching for jobs, building your profile, and submitting applications on NextHire is <strong className="text-white">completely free with no limits</strong>. You have full access to apply to any open opportunity without hidden fees or subscription locks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2.5 rounded-xl border border-zinc-800 shrink-0 text-xs text-zinc-300">
            <FiCheckCircle className="text-emerald-400 text-base" />
            <span>Unlimited Applications</span>
          </div>
        </div>
      </div>

      {/* ── Active Plan Card ─────────────────────────────────────────────── */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Current Active Plan
              </span>
              <span className="text-xs text-zinc-500">Billing: N/A (Free Account)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Seeker Early Access Tier
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Full candidate profile visibility and uncapped application privileges.
            </p>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 px-6 py-4 rounded-xl flex items-baseline gap-2 shrink-0">
            <span className="text-3xl font-extrabold text-white">$0</span>
            <span className="text-xs text-zinc-400 font-medium">/ month</span>
            <span className="ml-2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Free Forever
            </span>
          </div>
        </div>

        {/* Quota Usage Grid */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <FiSend className="text-emerald-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Job Applications
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Unlimited
              </p>
              <p className="text-[10px] text-emerald-400">No monthly quota caps</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <FiUserCheck className="text-blue-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Profile Visibility
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Public to Recruiters
              </p>
              <p className="text-[10px] text-emerald-400">Searchable talent database</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <FiZap className="text-purple-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                AI Match Preview
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Enabled
              </p>
              <p className="text-[10px] text-emerald-400">Standard match breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Future Candidate Premium Perks Preview ────────────────────── */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FiAward className="text-emerald-400 text-base" />
            <h2 className="text-sm font-bold text-zinc-200 tracking-wider uppercase">
              Upcoming Candidate Premium Perks
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            Preview of optional add-ons and premium candidate features planned for future updates. Core job applications will always remain 100% free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSeekerPerks.map((perk, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-zinc-950/40 border border-zinc-800/40 hover:border-zinc-700/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center">
                    {perk.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {perk.status}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-zinc-200 mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Billing & Payment History Empty Table ────────────────────────── */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <FiFileText className="text-emerald-400 text-lg" />
              Payment &amp; Transaction Receipts
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Billing transactions and active membership receipts.
            </p>
          </div>
        </div>

        <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4">
            <FiCreditCard className="text-emerald-400/70 text-2xl" />
          </div>

          <h3 className="text-base font-bold text-zinc-200 tracking-tight mb-1">
            No Payment History Found
          </h3>

          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-light mb-6">
            Your candidate account is completely free of charge. You have no active subscriptions, billing charges, or pending invoices on NextHire.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400">
            <FiInfo className="text-emerald-400 text-sm shrink-0" />
            <span>Job application services on NextHire are 100% free.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerBillingSkeleton;
