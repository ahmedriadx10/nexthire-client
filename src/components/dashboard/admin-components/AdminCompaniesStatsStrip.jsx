/**
 * AdminCompaniesStatsStrip
 * Stat summary cards showing total, pending, approved, and rejected companies counts.
 *
 * @param {{ stats: { totalCompanies: number, pendingCompanies: number, approvedCompanies: number, rejectedCompanies: number } }} props
 */
const AdminCompaniesStatsStrip = ({ stats = {} }) => {
  const {
    totalCompanies = 0,
    pendingCompanies = 0,
    approvedCompanies = 0,
    rejectedCompanies = 0,
  } = stats;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Total Companies
        </p>
        <p className="text-white text-xl sm:text-2xl font-extrabold">
          {totalCompanies}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Pending
        </p>
        <p className="text-amber-400 text-xl sm:text-2xl font-extrabold">
          {pendingCompanies}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Approved
        </p>
        <p className="text-emerald-400 text-xl sm:text-2xl font-extrabold">
          {approvedCompanies}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Rejected
        </p>
        <p className="text-rose-400 text-xl sm:text-2xl font-extrabold">
          {rejectedCompanies}
        </p>
      </div>
    </div>
  );
};

export default AdminCompaniesStatsStrip;
