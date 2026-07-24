import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

const CompanyManage = ({ company }) => {
  // Helper to extract initials for the recruiter avatar placeholder
  const getInitials = (name) => {
    if (!name) return "RC";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Helper to clean up the URL for display purposes
  const getDisplayUrl = (url) => {
    if (!url) return "";
    return url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
  };

  // Helper to determine status badge styling
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "pending";
    if (s === "approved" || s === "verified" || s === "active") {
      return {
        text: "Approved",
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    }
    if (s === "rejected" || s === "declined") {
      return {
        text: "Rejected",
        className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      };
    }
    return {
      text: "Pending",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse",
    };
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        
        {/* Brand Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Logo Frame with Glow Effect */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center p-4 shadow-xl shadow-black/40 group shrink-0">
            <div className="absolute inset-0 bg-primary/5 blur-md rounded-2xl group-hover:bg-primary/10 transition-colors duration-300"></div>
            {company?.logo ? (
              <Image
                src={company.logo}
                alt={`${company.name || "Company"} Logo`}
                width={96}
                height={96}
                className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            ) : (
              <span className="text-3xl font-black text-primary relative z-10">
                {company?.name ? company.name[0] : "C"}
              </span>
            )}
          </div>

          {/* Title and Badges Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {company?.industry && (
                <span className="text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-0.5 rounded-full tracking-wide">
                  {company.industry}
                </span>
              )}
              {company?.status && (
                (() => {
                  const badge = getStatusBadge(company.status);
                  return (
                    <span className={`text-[10px] sm:text-xs font-semibold border px-3 py-0.5 rounded-full tracking-wide ${badge.className}`}>
                      {badge.text}
                    </span>
                  );
                })()
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-2">
              {company?.name || "My Company"}
            </h2>

            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer mt-1"
              >
                {getDisplayUrl(company.website)}
                <FiExternalLink className="text-xs stroke-[2.5]" />
              </a>
            )}
          </div>
        </div>

        {/* CTA Post Job Button */}
        <div className="flex items-center md:self-center shrink-0">
          <Link href="/dashboard/recruiter/jobs/new">
            <button className="bg-primary text-zinc-950 hover:bg-primary/90 font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Post a Job
            </button>
          </Link>
        </div>

      </div>

      {/* Info Metric Cards Row */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-zinc-800/60 px-6 py-4 rounded-xl min-w-50 flex-1 sm:flex-initial">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            Employee Range
          </p>
          <p className="text-white text-sm font-bold">
            {company?.employeeRange || "N/A"}
          </p>
        </div>
        
        <div className="bg-zinc-900/40 border border-zinc-800/60 px-6 py-4 rounded-xl min-w-50 flex-1 sm:flex-initial">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
            HQ Location
          </p>
          <p className="text-white text-sm font-bold">
            {company?.location || "N/A"}
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-zinc-900 my-8"></div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: About Section */}
        <div className="md:col-span-8 space-y-4">
          <h3 className="text-lg font-bold text-primary tracking-tight">
            About {company?.name || "the Company"}
          </h3>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
            {company?.description || "No description provided yet. Complete your profile details in settings."}
          </p>
        </div>

        {/* Right Side: Recruiter and Location Details */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Recruiter Details Card */}
          <div className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-2xl shadow-inner">
            <h4 className="text-white text-sm font-bold tracking-wide mb-4">
              Recruiter Info
            </h4>
            
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/60 flex items-center justify-center shrink-0">
                {company?.recruiter?.image ? (
                  <Image
                    src={company.recruiter.image}
                    alt={company.recruiter.name || "Recruiter"}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-tr from-primary/30 to-blue-600/30 flex items-center justify-center text-primary font-bold text-sm">
                    {getInitials(company?.recruiter?.name || company?.recruiterEmail)}
                  </div>
                )}
              </div>
              
              <div>
                <h5 className="text-white text-sm font-bold">
                  {company?.recruiter?.name || "Company Recruiter"}
                </h5>
                <p className="text-zinc-500 text-xs font-semibold mt-0.5">
                  Senior Tech Recruiter
                </p>
              </div>
            </div>

            {company?.recruiterEmail && (
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center gap-1.5 text-primary hover:text-primary/90 text-xs font-semibold">
                <span className="text-primary font-bold text-sm">@</span>
                <a href={`mailto:${company.recruiterEmail}`} className="hover:underline truncate">
                  {company.recruiterEmail}
                </a>
              </div>
            )}
          </div>

          {/* Location / Offices Card */}
          <div className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-2xl flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-bold tracking-wide">
                  Location
                </h4>
                <FiMapPin className="text-zinc-600 text-sm" />
              </div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                Headquartered in {company?.location || "USA"}, with offices worldwide.
              </p>
            </div>

            {/* Premium Animated SVG Grid Network Map */}
            <div className="w-full bg-zinc-950/65 border border-zinc-900 rounded-xl p-3 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 320 160" fill="none" className="w-full h-auto text-zinc-800" style={{ minHeight: "120px" }}>
                <defs>
                  <pattern id="dot-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#3f3f46" opacity="0.4" />
                  </pattern>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00a6fb" stopOpacity="0.05" />
                    <stop offset="50%" stopColor="#00a6fb" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Dot Grid Background */}
                <rect width="320" height="160" fill="url(#dot-grid)" />
                
                {/* Simulated Network Paths */}
                <path d="M60 110 Q 130 50, 180 80 T 260 70" stroke="url(#line-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.7" />
                <path d="M100 60 Q 150 120, 220 90" stroke="url(#line-gradient)" strokeWidth="1" fill="none" opacity="0.5" />
                
                {/* Connecting Lines to Central Node */}
                <line x1="180" y1="80" x2="100" y2="60" stroke="#00a6fb" strokeWidth="0.75" opacity="0.25" strokeDasharray="2 2" />
                <line x1="180" y1="80" x2="220" y2="90" stroke="#00a6fb" strokeWidth="0.75" opacity="0.25" strokeDasharray="2 2" />
                <line x1="180" y1="80" x2="260" y2="70" stroke="#00a6fb" strokeWidth="0.75" opacity="0.25" strokeDasharray="2 2" />
                
                {/* Secondary Nodes */}
                <circle cx="60" cy="110" r="3" fill="#3f3f46" />
                <circle cx="100" cy="60" r="3" fill="#00a6fb" opacity="0.5" />
                <circle cx="220" cy="90" r="3" fill="#00a6fb" opacity="0.5" />
                <circle cx="260" cy="70" r="3" fill="#3f3f46" />
                
                {/* Glowing Central HQ Node */}
                <g transform="translate(180, 80)">
                  <circle r="8" fill="#00a6fb" opacity="0.4" className="animate-ping" />
                  <circle r="4" fill="#00a6fb" />
                  <circle r="1.5" fill="#ffffff" />
                </g>
              </svg>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CompanyManage;