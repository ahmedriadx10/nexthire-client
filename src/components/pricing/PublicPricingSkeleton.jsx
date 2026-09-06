"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCheckCircle,
  FiClock,
  FiZap,
  FiUsers,
  FiBriefcase,
  FiLock,
  FiHelpCircle,
  FiShield,
  FiArrowRight,
  FiGift,
  FiLayers,
  FiStar,
  FiSend,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

/**
 * PublicPricingSkeleton — Client Component
 *
 * Public Pricing & Early Access Information Page for all NextHire visitors,
 * recruiters, and job seekers.
 */

const recruiterTiers = [
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

const seekerTiers = [
  {
    name: "Seeker Standard",
    price: "$0",
    period: "forever",
    description: "Everything job seekers need to land their dream role.",
    features: [
      "Unlimited Job Applications",
      "Public Profile Visible to Employers",
      "Saved Jobs & Search Alerts",
      "Standard Application Tracking",
    ],
    highlight: false,
    badge: "Always Free Core Access",
  },
  {
    name: "Seeker Premium Perks",
    price: "$19",
    period: "per month",
    description: "Advanced tools to stand out and get hired faster.",
    features: [
      "Candidate Profile Spotlight in Recruiter Search",
      "Direct Priority Messaging to Hiring Managers",
      "AI Resume & Skill Gap Analysis",
      "Real-time Salary Benchmarking Reports",
    ],
    highlight: true,
    badge: "Upcoming Perks",
  },
];

const faqs = [
  {
    question: "Why is NextHire currently 100% free?",
    answer:
      "NextHire is currently in active development. During this early access phase, we are inviting recruiters and job seekers to test our platform, share feedback, and help us refine our hiring experience without any subscription fees.",
  },
  {
    question: "Do I need to enter a credit card or payment info?",
    answer:
      "No! You can register, post jobs, and apply for positions immediately without entering any credit card details or payment method.",
  },
  {
    question: "Will I be charged unexpectedly when paid tiers launch?",
    answer:
      "Never. We will notify all early access users well in advance of any tier updates. Early adopters will also receive exclusive perks and discounts when monetization features launch.",
  },
  {
    question: "What features are unlocked right now?",
    answer:
      "Right now, all features—including unlimited job postings, candidate resume views, applicant tracking, and job submissions—are unlocked for free for both recruiters and candidates.",
  },
];

const PublicPricingSkeleton = () => {
  const [activeTab, setActiveTab] = useState("recruiter");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 select-none pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ── Page Hero Header ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-blue-500/10 via-purple-500/10 to-rose-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <FiClock className="text-xs shrink-0" />
            <span>Early Access Phase • 100% Free Access</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transparent Pricing for <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
              Every Recruiter &amp; Job Seeker
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            NextHire is actively building the future of hiring. During our development preview, all core features, job postings, and candidate applications are <strong className="text-white">100% free with no limitations</strong>.
          </p>
        </div>

        {/* ── Early Access Free Access Callout Banner ──────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-blue-500/10 via-purple-500/5 to-zinc-900/60 border border-blue-500/20 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                <FiGift className="text-blue-400 text-2xl" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Developer Preview Access Active
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    No Credit Card Required
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-3xl">
                  Subscription plans, paid recruiter upgrades, and Stripe billing will be integrated in future releases. Until then, enjoy full access to all NextHire features without cost or trial timers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/20"
              >
                Get Started Free <FiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Dual Value Cards */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employer Value */}
            <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FiBriefcase className="text-blue-400 text-base" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">For Recruiters &amp; Companies</h3>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                  Post unlimited open roles, browse candidate profiles, track applicants, and collaborate with your hiring team—all for $0.
                </p>
              </div>
            </div>

            {/* Candidate Value */}
            <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <FiSend className="text-emerald-400 text-base" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">For Job Seekers</h3>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                  Apply to unlimited jobs, build a public candidate profile, save opportunities, and track your applications without paying a dime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Upcoming Subscription Tiers Preview ──────────────────────────── */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiLayers className="text-blue-400 text-lg" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Future Plan Roadmap
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Preview of tiered plans launching in future NextHire releases. Currently, all features below are free.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "recruiter"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Recruiter Plans
              </button>
              <button
                onClick={() => setActiveTab("seeker")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "seeker"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Job Seeker Plans
              </button>
            </div>
          </div>

          {/* Tiers Grid */}
          {activeTab === "recruiter" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recruiterTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between relative transition-all ${
                    tier.highlight
                      ? "bg-linear-to-b from-blue-950/40 to-zinc-900/80 border-blue-500/40 shadow-xl shadow-blue-500/5"
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

                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                      {tier.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-zinc-800/60">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs text-zinc-500">{tier.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-zinc-300 flex items-start gap-2.5">
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
                      Planned for Future Release
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {seekerTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between relative transition-all ${
                    tier.highlight
                      ? "bg-linear-to-b from-emerald-950/40 to-zinc-900/80 border-emerald-500/40 shadow-xl shadow-emerald-500/5"
                      : "bg-zinc-900/40 border-zinc-800/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                      {tier.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-zinc-800/60">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs text-zinc-500">{tier.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                          <FiCheckCircle className="text-emerald-400 text-sm shrink-0 mt-0.5" />
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
                      Currently 100% Unlocked for Free
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Frequently Asked Questions Section ──────────────────────────── */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <FiHelpCircle className="text-blue-400 text-xl" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="text-sm sm:text-base font-bold text-zinc-200 group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-lg bg-zinc-800/50 border border-zinc-700/40 text-zinc-400 shrink-0">
                      {isOpen ? (
                        <FiChevronUp className="text-sm" />
                      ) : (
                        <FiChevronDown className="text-sm" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mt-3 pr-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer Call To Action ────────────────────────────────────────── */}
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-blue-600/10 via-purple-600/10 to-rose-600/10 border border-zinc-800 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Start Using NextHire Today
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Join thousands of recruiters and candidates on NextHire. Enjoy 100% free early access to all platform features.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/20 inline-flex items-center gap-2"
            >
              Create Free Account <FiArrowRight className="text-sm" />
            </Link>
            <Link
              href="/browse-jobs"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 transition-all"
            >
              Browse Open Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPricingSkeleton;
