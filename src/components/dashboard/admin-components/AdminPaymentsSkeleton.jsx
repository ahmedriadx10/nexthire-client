"use client";

import {
  FiDollarSign,
  FiCreditCard,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiShield,
  FiCheckCircle,
  FiLayers,
  FiSearch,
  FiFilter,
  FiDownload,
  FiSliders,
  FiZap,
} from "react-icons/fi";

/**
 * AdminPaymentsSkeleton — Client Component
 *
 * Industry-standard skeleton / informative dashboard for Platform Payments
 * & Subscription Management during NextHire's active development phase.
 */

const upcomingAdminMonetizationFeatures = [
  {
    icon: <FiSliders className="text-rose-400 text-lg" />,
    title: "Tier & Quota Management",
    desc: "Configure pricing tiers, job posting limits, applicant view caps, and feature flags across Recruiter and Seeker roles.",
    status: "Planned for Next Release",
  },
  {
    icon: <FiCreditCard className="text-purple-400 text-lg" />,
    title: "Stripe & Gateway Integration",
    desc: "Seamless payment gateway integration supporting credit cards, recurring billing, webhooks, and automated invoicing.",
    status: "In Development",
  },
  {
    icon: <FiTrendingUp className="text-emerald-400 text-lg" />,
    title: "MRR & Revenue Analytics",
    desc: "Real-time analytics dashboard for Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), churn rate, and subscriber growth.",
    status: "Planned",
  },
  {
    icon: <FiZap className="text-amber-400 text-lg" />,
    title: "Promotions & Coupon Engine",
    desc: "Create and manage promotional discount codes, early-bird vouchers, and custom enterprise contract pricing.",
    status: "Planned",
  },
];

const AdminPaymentsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12 select-none space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Payments &amp; Subscriptions
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
              <FiClock className="text-xs" /> Early Access Phase
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Monitor platform revenue, manage pricing plans, payment transactions, and subscription access.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-xs font-semibold text-zinc-500 cursor-not-allowed"
          >
            <FiDownload className="text-sm" /> Export Financial Report
          </button>
        </div>
      </div>

      {/* ── Platform Pre-Release Alert Banner ─────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-rose-500/10 via-purple-500/5 to-zinc-900/40 border border-rose-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <FiShield className="text-rose-400 text-xl" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Platform Monetization Disabled (Development Stage)
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                  All Tiers Unlocked
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                NextHire is currently running in a <strong className="text-white">100% Free Development &amp; Early Access</strong> build. All recruiters and job seekers currently enjoy unrestricted, unlimited access without subscription caps or payment gateways. Financial tracking tools will go live upon official launch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2.5 rounded-xl border border-zinc-800 shrink-0 text-xs text-zinc-300">
            <FiCheckCircle className="text-emerald-400 text-base" />
            <span>Stripe Sandbox Ready for Release v2.0</span>
          </div>
        </div>
      </div>

      {/* ── Summary Stats Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Platform Revenue */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <FiDollarSign className="text-rose-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white tracking-tight">$0.00</p>
            <p className="text-[11px] text-zinc-500 mt-1 font-light flex items-center gap-1">
              <span className="text-amber-400 font-medium">Free Beta Phase</span> • No active charges
            </p>
          </div>
        </div>

        {/* Active Subscribers */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Paid Subscriptions
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <FiCreditCard className="text-purple-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white tracking-tight">0</p>
            <p className="text-[11px] text-zinc-500 mt-1 font-light flex items-center gap-1">
              <span className="text-emerald-400 font-medium">100% Users</span> on Unlimited Access
            </p>
          </div>
        </div>

        {/* Recruiter Tier Status */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Recruiter Plan Default
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <FiUsers className="text-blue-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-white tracking-tight">Unlimited Free</p>
            <p className="text-[11px] text-zinc-500 mt-1 font-light">
              No job post or applicant limits
            </p>
          </div>
        </div>

        {/* Seeker Tier Status */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Seeker Plan Default
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FiLayers className="text-emerald-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-white tracking-tight">Unlimited Free</p>
            <p className="text-[11px] text-zinc-500 mt-1 font-light">
              Uncapped job applications
            </p>
          </div>
        </div>
      </div>

      {/* ── Transaction Ledger Section (Empty State) ────────────────────── */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        {/* Header & Filter Controls Placeholder */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Platform Transaction Ledger
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              History of all subscription billing events, payments, and invoice receipts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative shrink-0">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />
              <input
                type="text"
                disabled
                placeholder="Filter by user email or ID..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 placeholder:text-zinc-600 cursor-not-allowed focus:outline-none w-48 sm:w-60"
              />
            </div>
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-500 cursor-not-allowed"
            >
              <FiFilter className="text-xs" /> Filter
            </button>
          </div>
        </div>

        {/* Empty State Presentation */}
        <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4">
            <FiCreditCard className="text-rose-400/70 text-3xl" />
          </div>

          <h3 className="text-base font-bold text-zinc-200 tracking-tight mb-1">
            No Billing Transactions Recorded
          </h3>

          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-light mb-6">
            Financial transaction logging is currently inactive because NextHire operates under a free access model during development. Platform invoice histories will automatically record here when payment processing is activated.
          </p>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/40 text-[11px] font-medium text-zinc-400">
            <FiClock className="text-rose-400 text-xs" /> Payment Gateway Integration Pending Next Major Release
          </span>
        </div>
      </div>

      {/* ── Admin Billing & Monetization Roadmap ───────────────────────── */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FiSliders className="text-rose-400 text-base" />
            <h2 className="text-sm font-bold text-zinc-200 tracking-wider uppercase">
              Platform Monetization Architecture
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            Preview of payment infrastructure, subscription tiers, and administrative controls currently in development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAdminMonetizationFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-zinc-950/40 border border-zinc-800/40 hover:border-zinc-700/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-rose-400/90 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full">
                    {feat.status}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-zinc-200 mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentsSkeleton;
