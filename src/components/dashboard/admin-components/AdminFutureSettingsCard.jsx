"use client";

import { FiSliders, FiClock, FiShield, FiKey, FiBell, FiLayers } from "react-icons/fi";

/**
 * AdminFutureSettingsCard — Client Component
 *
 * Notice / Placeholder card informing administrators about upcoming platform
 * management features planned for future releases.
 */

const upcomingFeatures = [
  {
    icon: <FiShield className="text-rose-400 text-base" />,
    title: "Admin Profile Customization",
    desc: "Extended bio, administrative designation, contact credentials, and avatar preferences.",
  },
  {
    icon: <FiClock className="text-amber-400 text-base" />,
    title: "System Audit & Activity Logs",
    desc: "Detailed access logs, role escalation history, and administrative activity tracking.",
  },
  {
    icon: <FiKey className="text-emerald-400 text-base" />,
    title: "API Keys & Integrations",
    desc: "Manage platform API keys, third-party webhooks, and external service credentials.",
  },
  {
    icon: <FiBell className="text-purple-400 text-base" />,
    title: "Platform Notification Controls",
    desc: "Configure platform alerts, automated email triggers, and system incident notifications.",
  },
];

const AdminFutureSettingsCard = () => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col h-full">
      {/* ── Card Header ── */}
      <div className="px-6 pt-6 pb-4 border-b border-zinc-800/50 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-2">
            <FiSliders className="text-rose-400 text-base" />
            Admin Profile &amp; System Settings
          </h2>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-light">
            Advanced system controls &amp; platform configuration modules
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase tracking-wider shrink-0">
          <FiClock className="text-[10px]" />
          Coming Soon
        </span>
      </div>

      {/* ── Card Body ── */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        {/* Banner callout */}
        <div className="p-4 rounded-xl bg-linear-to-r from-rose-500/5 via-purple-500/5 to-transparent border border-rose-500/15 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <FiLayers className="text-rose-400 text-lg" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-200 tracking-tight">
              Future Administrative Expansion
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
              We are actively developing comprehensive administrative tooling for NextHire. Below is a preview of system management features arriving in upcoming platform updates.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {upcomingFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/40 hover:border-zinc-800 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                  {feat.icon}
                </div>
                <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-zinc-500 font-light mt-1 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-zinc-800/30 flex items-center justify-between">
                <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">
                  Status
                </span>
                <span className="text-[10px] text-rose-400/80 font-medium italic">
                  In Development
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFutureSettingsCard;
