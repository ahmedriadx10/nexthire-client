"use client";

import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiHelpCircle,
  FiInfo,
  FiLayers,
  FiLock,
  FiStar,
  FiUsers,
  FiZap,
} from "react-icons/fi";

/**
 * RecruiterBillingSkeleton — Client Component
 *
 * Industry-standard plan management & billing page skeleton for Recruiters
 * during NextHire's development & free early-access phase.
 */

const upcomingRecruiterTiers = [
  {
    name: "Starter / Free",
    price: "$0",
    period: "forever",
    description: "Essential hiring tools for startups and small recruitment teams.",
    features: [
      "Up to 3 Active Job Postings",
      "Standard Candidate Application Tracking",
      "Basic Company Profile Page",
      "Email Application Alerts",
    ],
    highlight: false,
    badge: "Future Default Tier",
  },
  {
    name: "Growth / Pro",
    price: "$99",
    period: "per month",
    description: "Accelerated hiring capabilities for growing companies & agencies.",
    features: [
      "Up to 15 Active Job Postings",
      "Featured Job Slots in Search",
      "Unlimited Resume Downloads",
      "Direct Candidate Messaging",
      "Basic Hiring Analytics & Reports",
    ],
    highlight: true,
    badge: "Upcoming Release",
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "per month",
    description: "Full-suite talent acquisition for high-volume hiring teams.",
    features: [
      "Unlimited Active Job Postings",
      "Priority Candidate Search & AI Match",
      "Custom ATS & Webhook Integration",
      "Unlimited Team Seats & Roles",
      "Dedicated Account Manager",
    ],
    highlight: false,
    badge: "Enterprise Roadmap",
  },
];

const RecruiterBillingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12 select-none space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Subscription &amp; Billing
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <FiClock className="text-xs" /> Early Access
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Manage your company&apos;s hiring plan, active job quotas, and payment receipts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-xs font-semibold text-zinc-500 cursor-not-allowed"
          >
            <FiDownload className="text-sm" /> Download Receipts
          </button>
        </div>
      </div>

      {/* ── Early Access Promotional Banner ──────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-blue-500/10 via-purple-500/5 to-zinc-900/40 border border-blue-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <FiZap className="text-blue-400 text-xl" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Free Unlimited Hiring Access Active
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                  No Cost
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                During NextHire&apos;s current development phase, recruiters enjoy <strong className="text-white">completely free, uncapped access</strong> to post jobs, review candidate resumes, and manage hiring pipelines. Tiered subscription billing will be introduced in future platform releases.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2.5 rounded-xl border border-zinc-800 shrink-0 text-xs text-zinc-300">
            <FiCheckCircle className="text-emerald-400 text-base" />
            <span>0 Charges Accrued</span>
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
              <span className="text-xs text-zinc-500">Renews: N/A (Free Beta)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Recruiter Early Access Tier
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Full enterprise recruitment capabilities enabled for your company workspace.
            </p>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 px-6 py-4 rounded-xl flex items-baseline gap-2 shrink-0">
            <span className="text-3xl font-extrabold text-white">$0</span>
            <span className="text-xs text-zinc-400 font-medium">/ month</span>
            <span className="ml-2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              100% Free
            </span>
          </div>
        </div>

        {/* Quota Usage Grid */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <FiBriefcase className="text-blue-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Active Job Limit
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Unlimited Posts
              </p>
              <p className="text-[10px] text-emerald-400">No posting caps active</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <FiUsers className="text-purple-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Candidate Profiles
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Unlimited Views
              </p>
              <p className="text-[10px] text-emerald-400">Full resume access</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <FiLayers className="text-emerald-400 text-lg" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Team Collaboration
              </p>
              <p className="text-sm font-bold text-white tracking-tight mt-0.5">
                Unlimited Seats
              </p>
              <p className="text-[10px] text-emerald-400">All features unlocked</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Planned Recruiter Subscription Tiers Preview ────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FiLayers className="text-blue-400 text-lg" />
              Upcoming Recruiter Subscription Tiers
            </h2>
            <p className="text-xs text-zinc-400">
              Preview of plan structures that will launch in future updates. Currently, your account enjoys all Enterprise tier benefits for free.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upcomingRecruiterTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all ${
                tier.highlight
                  ? "bg-linear-to-b from-blue-950/30 to-zinc-900/60 border-blue-500/40 shadow-lg shadow-blue-500/5"
                  : "bg-zinc-900/40 border-zinc-800/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                    {tier.badge}
                  </span>
                  {tier.highlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <FiStar className="text-[10px]" /> Recommended
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-zinc-800/60">
                  <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-zinc-500">{tier.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <FiCheckCircle className="text-blue-400 text-sm shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/40 text-xs font-semibold text-zinc-400 flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <FiLock className="text-xs text-zinc-500" />
                  Available in Next Release
                </button>
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
              <FiFileText className="text-blue-400 text-lg" />
              Invoice &amp; Billing History
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Payment records and downloadable PDF tax invoices for your company.
            </p>
          </div>
        </div>

        <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4">
            <FiCreditCard className="text-blue-400/70 text-2xl" />
          </div>

          <h3 className="text-base font-bold text-zinc-200 tracking-tight mb-1">
            No Payment History Found
          </h3>

          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-light mb-6">
            You have not been billed because your recruiter account is operating under NextHire&apos;s free early access program. Future payment statements and invoices will appear here.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400">
            <FiInfo className="text-blue-400 text-sm shrink-0" />
            <span>Need enterprise inquiries? Contact platform support.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterBillingSkeleton;
