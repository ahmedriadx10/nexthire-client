"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";
import { FiUser, FiUsers, FiMail, FiCalendar, FiTag } from "react-icons/fi";
import AdminUserRoleBadge from "./AdminUserRoleBadge";
import AdminUserActionButtons from "./AdminUserActionButtons";

// ─── Date Formatting ──────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ search, role }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-zinc-950/40 border border-zinc-800/60 rounded-2xl">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiUsers className="size-7 text-zinc-600" />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">No Users Found</h3>
    <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
      {search || (role && role !== "all")
        ? "No users matched your search or role filter. Try adjusting your search query or filter settings."
        : "There are no users registered on the platform yet."}
    </p>
  </div>
);

// ─── Pagination Component ─────────────────────────────────────────────────────

const UsersPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="flex items-center justify-center py-4">
      <Pagination.Content className="flex items-center gap-1">
        <Pagination.Item>
          <Pagination.Previous
            onClick={() => goToPage(currentPage - 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === 1
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>

        {pages.map((p, idx) =>
          p === "..." ? (
            <Pagination.Item key={`ellipsis-${idx}`}>
              <Pagination.Ellipsis className="text-zinc-600 px-2 text-sm" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onClick={() => goToPage(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  p === currentPage
                    ? "bg-primary text-zinc-950 shadow-md shadow-primary/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        <Pagination.Item>
          <Pagination.Next
            onClick={() => goToPage(currentPage + 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === totalPages
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
};

// ─── Main Admin Table ─────────────────────────────────────────────────────────

/**
 * AdminUsersTable
 * Client component — renders plain dark Tailwind table for all users.
 *
 * @param {{ users: Array, totalUsers: number, currentPage: number, totalPages: number, currentSearch: string, currentRole: string, currentUser: Object }} props
 */
const AdminUsersTable = ({
  users = [],
  totalUsers = 0,
  currentPage = 1,
  totalPages = 1,
  currentSearch = "",
  currentRole = "all",
  currentUser = null,
}) => {
  if (!users || users.length === 0) {
    return <EmptyState search={currentSearch} role={currentRole} />;
  }

  return (
    <div className="space-y-4">
      {/* Summary count */}
      <p className="text-xs text-zinc-500 font-medium">
        Showing{" "}
        <span className="text-zinc-300 font-semibold">{users.length}</span> of{" "}
        <span className="text-zinc-300 font-semibold">{totalUsers}</span> user
        {totalUsers === 1 ? "" : "s"}
      </p>

      {/* Table container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary rounded-xl border border-zinc-800/60 bg-zinc-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                User
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Role
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Plan
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                Joined Date
              </th>
              <th className="px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const isSelf = Boolean(
                currentUser &&
                  ((user._id && currentUser._id && String(user._id) === String(currentUser._id)) ||
                    (user._id && currentUser.id && String(user._id) === String(currentUser.id)) ||
                    (user.email && currentUser.email && user.email.toLowerCase() === currentUser.email.toLowerCase()))
              );

              const initialLetter = user.name
                ? user.name.charAt(0).toUpperCase()
                : user.email
                ? user.email.charAt(0).toUpperCase()
                : "U";

              const formattedPlan = user.plan
                ? user.plan.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                : "Free";

              return (
                <tr
                  key={user._id || index}
                  className={`group transition-colors duration-150 hover:bg-zinc-900/50 ${
                    index !== users.length - 1 ? "border-b border-zinc-800/40" : ""
                  } ${isSelf ? "bg-zinc-900/30" : ""}`}
                >
                  {/* Avatar + User Name + Email */}
                  <td className="px-5 py-4 min-w-55">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center relative text-zinc-300 font-bold text-sm">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || user.email || "User Avatar"}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <span>{initialLetter}</span>
                        )}
                      </div>

                      <div className="space-y-0.5 max-w-50">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors duration-200 truncate">
                            {user.name || "Unnamed User"}
                          </p>
                          {isSelf && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-primary/20 text-primary border border-primary/30 shrink-0">
                              YOU
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-500 truncate flex items-center gap-1">
                          <FiMail className="size-3 text-zinc-600 shrink-0" />
                          <span title={user.email}>{user.email || "—"}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <AdminUserRoleBadge role={user.role} />
                  </td>

                  {/* Plan Tag */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <FiTag className="size-3 text-zinc-500" />
                      <span>{formattedPlan}</span>
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="px-5 py-4 whitespace-nowrap text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="size-3.5 text-zinc-600" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <AdminUserActionButtons user={user} currentUser={currentUser} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <UsersPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminUsersTable;
