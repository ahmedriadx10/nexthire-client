import { protectedFetchData } from "@/lib/core/server-manage";

/**
 * Fetch all jobs for admin management with optional search query, status filter, and page number.
 * 
 * @param {string} search - Search query string (matches jobTitle and jobCategory)
 * @param {string} status - Filter status ('active' | 'closed' | '')
 * @param {number|string} page - Page number
 * @returns {Promise<Object>} - API response with { success, stats, jobs, pagination }
 */
export const getAdminJobs = async (search = "", status = "", page = 1) => {
  const queryParams = new URLSearchParams();
  
  if (search && search.trim() !== "") {
    queryParams.set("search", search.trim());
  }

  if (status && status !== "all") {
    queryParams.set("status", status);
  }

  if (page && parseInt(page, 10) > 1) {
    queryParams.set("page", page);
  }

  const queryString = queryParams.toString();
  const path = `/admin/jobs${queryString ? `?${queryString}` : ""}`;

  return protectedFetchData(path);
};
