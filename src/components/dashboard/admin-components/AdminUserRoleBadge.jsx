import { FiBriefcase, FiShield, FiUser } from "react-icons/fi";

/**
 * AdminUserRoleBadge
 * Renders role badge for users (seeker, recruiter, admin).
 *
 * @param {{ role: string }} props
 */
const AdminUserRoleBadge = ({ role = "seeker" }) => {
  const normalizedRole = role?.toLowerCase() || "seeker";

  switch (normalizedRole) {
    case "admin":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <FiShield className="size-3" />
          <span>Admin</span>
        </span>
      );

    case "recruiter":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <FiBriefcase className="size-3" />
          <span>Recruiter</span>
        </span>
      );

    case "seeker":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <FiUser className="size-3" />
          <span>Seeker</span>
        </span>
      );
  }
};

export default AdminUserRoleBadge;
