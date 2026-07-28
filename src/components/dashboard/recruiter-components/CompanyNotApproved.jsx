"use client";

import Link from "next/link";
import { FiAlertTriangle, FiXCircle, FiMail, FiArrowLeft, FiClock } from "react-icons/fi";

// Shared support email
const SUPPORT_EMAIL = "support@nexthire.com";

const StatusConfig = {
  pending: {
    icon: FiClock,
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    glowColor: "bg-amber-500/10",
    title: "Company Under Review",
    badge: "Pending Review",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description:
      "Your company profile has been submitted and is currently being reviewed by our admin team. This process typically takes 1–2 business days.",
    subtext:
      "You will be notified once the review is complete. In the meantime, you can update your company profile to ensure all information is accurate.",
    ctaLabel: "Go to My Company",
    ctaHref: "/dashboard/recruiter/company",
  },
  rejected: {
    icon: FiXCircle,
    iconBg: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-400",
    glowColor: "bg-rose-500/15",
    title: "Company Registration Rejected",
    badge: "Rejected",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    description:
      "Unfortunately, your company registration was not approved. This could be due to incomplete or inaccurate information in your profile.",
    subtext:
      "Please review and update your company information, or contact our support team for guidance on getting your company re-approved.",
    ctaLabel: "Update Company Profile",
    ctaHref: "/dashboard/recruiter/company",
  },
};

const CompanyNotApproved = ({ status, companyName }) => {
  const config = StatusConfig[status] || StatusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">

        {/* Card Container */}
        <div className="relative bg-zinc-900/60 border border-zinc-800/70 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 overflow-hidden">

          {/* Background Glow */}
          <div className={`absolute -top-20 -right-20 w-64 h-64 ${config.glowColor} blur-3xl rounded-full pointer-events-none`} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Icon */}
            <div className="relative mb-6 inline-flex">
              <div className={`absolute inset-0 ${config.glowColor} blur-2xl rounded-full`} />
              <div className={`relative w-20 h-20 rounded-2xl border ${config.iconBg} flex items-center justify-center shadow-inner`}>
                <Icon className={`text-4xl ${config.iconColor} stroke-[1.5]`} />
              </div>
            </div>

            {/* Status Badge */}
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border px-3 py-1 rounded-full mb-4 ${config.badgeClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {config.badge}
            </span>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              {config.title}
            </h2>

            {/* Company Name */}
            {companyName && (
              <p className="text-primary font-semibold text-sm mb-4">
                {companyName}
              </p>
            )}

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              {config.description}
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed mb-8">
              {config.subtext}
            </p>

            {/* Divider */}
            <div className="w-full border-t border-zinc-800/60 mb-8" />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link href={config.ctaHref} className="flex-1">
                <button className="w-full bg-primary text-zinc-950 hover:bg-primary/90 font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm">
                  {config.ctaLabel}
                </button>
              </Link>

              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Company Review Inquiry — ${companyName || "My Company"}`}
                className="flex-1"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold px-6 py-3 rounded-xl border border-zinc-700/60 hover:border-zinc-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm">
                  <FiMail className="text-base shrink-0" />
                  Contact Support
                </button>
              </a>
            </div>

            {/* Back Link */}
            <Link
              href="/dashboard/recruiter"
              className="mt-6 flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-colors duration-200"
            >
              <FiArrowLeft className="text-sm" />
              Back to Dashboard
            </Link>

          </div>
        </div>

        {/* Support Email Footer Note */}
        <p className="text-center text-zinc-600 text-xs mt-4">
          Need help?{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary hover:underline font-semibold"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>

      </div>
    </div>
  );
};

export default CompanyNotApproved;
