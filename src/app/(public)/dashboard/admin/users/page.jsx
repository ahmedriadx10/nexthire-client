import { getAdminUsers } from "@/lib/api/admin-api/AdminUser";
import { getLoggedInUserSession } from "@/lib/core/Session";
import AdminUsersStatsStrip from "@/components/dashboard/admin-components/AdminUsersStatsStrip";
import AdminUsersSearchFilter from "@/components/dashboard/admin-components/AdminUsersSearchFilter";
import AdminUsersTable from "@/components/dashboard/admin-components/AdminUsersTable";

/**
 * AdminUsersManagementPage — Server Component
 *
 * Responsibilities:
 *  1. Read searchParams (`search`, `role`, `page`) from URL query string.
 *  2. Fetch logged-in admin user session for self-action protection.
 *  3. Fetch users, stats, and pagination metadata from `/admin/users` API.
 *  4. Render stats strip, search & role filter controls, and paginated users table with role update and delete actions.
 */
const AdminUsersManagementPage = async ({ searchParams }) => {
  const { search = "", role = "all", page = "1" } = (await searchParams) || {};
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Fetch logged-in admin user session
  const currentUser = await getLoggedInUserSession();

  // Fetch users data from server API
  const response = await getAdminUsers(search, role, currentPage);

  const users = response?.users ?? [];
  const stats = response?.stats ?? {
    totalUsers: 0,
    totalRecruiters: 0,
    totalSeekers: 0,
    last24HoursSignups: 0,
  };
  const pagination = response?.pagination ?? {
    currentPage: 1,
    limit: 20,
    totalUsers: users.length,
    totalPages: 1,
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
          Manage Users
        </h1>
        <p className="text-sm text-zinc-500">
          View, search, filter, update roles, and manage user accounts across the platform.
        </p>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <AdminUsersStatsStrip stats={stats} />

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900 mb-6" />

      {/* ── Search & Role Filter Controls (Client Component) ─────────────── */}
      <AdminUsersSearchFilter
        currentSearch={search}
        currentRole={role}
      />

      {/* ── Users Table & Pagination (Client Component) ─────────────────── */}
      <AdminUsersTable
        users={users}
        totalUsers={pagination.totalUsers ?? users.length}
        currentPage={pagination.currentPage ?? currentPage}
        totalPages={pagination.totalPages ?? 1}
        currentSearch={search}
        currentRole={role}
        currentUser={currentUser}
      />
    </div>
  );
};

export default AdminUsersManagementPage;
