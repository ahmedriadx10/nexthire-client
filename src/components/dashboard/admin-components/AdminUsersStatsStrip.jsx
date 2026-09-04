/**
 * AdminUsersStatsStrip
 * Stat summary cards showing total users, recruiters, seekers, and 24-hour signups.
 *
 * @param {{ stats: { totalUsers: number, totalRecruiters: number, totalSeekers: number, last24HoursSignups: number } }} props
 */
const AdminUsersStatsStrip = ({ stats = {} }) => {
  const {
    totalUsers = 0,
    totalRecruiters = 0,
    totalSeekers = 0,
    last24HoursSignups = 0,
  } = stats;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Total Users
        </p>
        <p className="text-white text-xl sm:text-2xl font-extrabold">
          {totalUsers}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Total Recruiters
        </p>
        <p className="text-blue-400 text-xl sm:text-2xl font-extrabold">
          {totalRecruiters}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          Total Seekers
        </p>
        <p className="text-emerald-400 text-xl sm:text-2xl font-extrabold">
          {totalSeekers}
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 px-5 py-4 rounded-xl">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
          24h Signups
        </p>
        <p className="text-purple-400 text-xl sm:text-2xl font-extrabold">
          {last24HoursSignups}
        </p>
      </div>
    </div>
  );
};

export default AdminUsersStatsStrip;
