"use client";

const statusConfig = {
  approved: {
    label: "Approved",
    containerClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotClass: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    containerClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotClass: "bg-amber-400 animate-pulse",
  },
  rejected: {
    label: "Rejected",
    containerClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotClass: "bg-rose-400",
  },
};

const AdminCompanyStatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || "pending";
  const config = statusConfig[normalizedStatus] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${config.containerClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
};

export default AdminCompanyStatusBadge;
