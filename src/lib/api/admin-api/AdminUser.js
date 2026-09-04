import { protectedFetchData } from "@/lib/core/server-manage";

/**
 * Fetch all users for admin management with optional search query, role filter, and page number.
 * 
 * @param {string} search - Search query string (matches name and email)
 * @param {string} role - Filter role ('seeker' | 'recruiter' | 'admin' | 'all' | '')
 * @param {number|string} page - Page number
 * @returns {Promise<Object>} - API response with { success, stats, users, pagination }
 */
export const getAdminUsers = async (search = "", role = "", page = 1) => {
  const queryParams = new URLSearchParams();

  if (search && search.trim() !== "") {
    queryParams.set("search", search.trim());
  }

  // When role is 'all' or empty, do not pass role query parameter to the server
  if (role && role !== "all") {
    queryParams.set("role", role.trim());
  }

  const pageNum = parseInt(page, 10);
  if (pageNum && pageNum > 1) {
    queryParams.set("page", pageNum);
  }

  const queryString = queryParams.toString();
  const path = `/admin/users${queryString ? `?${queryString}` : ""}`;

  return protectedFetchData(path);
};
