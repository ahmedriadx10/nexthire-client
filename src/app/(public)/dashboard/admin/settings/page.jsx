import { getLoggedInUserSession } from "@/lib/core/Session";
import AdminAccountCard from "@/components/dashboard/admin-components/AdminAccountCard";
import AdminFutureSettingsCard from "@/components/dashboard/admin-components/AdminFutureSettingsCard";

import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Platform Settings | NextHire Admin",
  description: "Manage administrator account details, security settings, and platform configuration options.",
  noIndex: true,
});

const AdminProfileSettingsPage = async () => {
  const currentUser = await getLoggedInUserSession();

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
          Admin Profile &amp; Settings
        </h1>
        <p className="text-sm text-zinc-500 font-light mt-1.5">
          Manage your administrative identity, account details, and system configuration preferences.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Admin Account Info & Hero Banner */}
        <div className="xl:col-span-5">
          <AdminAccountCard adminData={currentUser} />
        </div>

        {/* Right: Upcoming Admin System Features & Settings */}
        <div className="xl:col-span-7">
          <AdminFutureSettingsCard />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSettingsPage;