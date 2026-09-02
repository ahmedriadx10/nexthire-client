import { getAdminCompanies } from "@/lib/api/admin-api/AdminCompany";
import AdminCompaniesStatsStrip from "@/components/dashboard/admin-components/AdminCompaniesStatsStrip";
import AdminCompaniesSearchFilter from "@/components/dashboard/admin-components/AdminCompaniesSearchFilter";
import AdminCompaniesTable from "@/components/dashboard/admin-components/AdminCompaniesTable";

/**
 * AdminManageCompaniesPage — Server Component
 *
 * Responsibilities:
 *  1. Read searchParams (`search`, `status`, `page`) from URL query.
 *  2. Fetch companies, stats, and pagination metadata from `/admin/companies` API.
 *  3. Render stats strip, search & filter controls, and paginated companies table with actions.
 */
const AdminManageCompaniesPage = async ({ searchParams }) => {
  const { search = "", status = "all", page = "1" } = (await searchParams) || {};
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Fetch companies data from server API
  const response = await getAdminCompanies(search, status, currentPage);

  const companies = response?.data ?? [];
  const stats = response?.stats ?? {
    totalCompanies: 0,
    pendingCompanies: 0,
    approvedCompanies: 0,
    rejectedCompanies: 0,
  };
  const pagination = response?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalCompanies: companies.length,
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
          Manage Companies
        </h1>
        <p className="text-sm text-zinc-500">
          Review, approve, or reject company profiles submitted by recruiters across the platform.
        </p>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <AdminCompaniesStatsStrip stats={stats} />

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900 mb-6" />

      {/* ── Search & Status Filter Controls (Client Component) ───────────── */}
      <AdminCompaniesSearchFilter
        currentSearch={search}
        currentStatus={status}
      />

      {/* ── Companies Table & Pagination (Client Component) ─────────────── */}
      <AdminCompaniesTable
        companies={companies}
        totalCompanies={pagination.totalCompanies ?? companies.length}
        currentPage={pagination.currentPage ?? currentPage}
        totalPages={pagination.totalPages ?? 1}
        currentSearch={search}
        currentStatus={status}
      />
    </div>
  );
};

export default AdminManageCompaniesPage;
