import { protectedFetchData } from "@/lib/core/server-manage";

/**
 * Fetch all companies for admin management with optional search, status filter, and page number.
 * 
 * @param {string} search - Search query term (e.g. company name)
 * @param {string} status - Filter status ('pending' | 'approved' | 'rejected' | '')
 * @param {number|string} page - Page number
 * @returns {Promise<Object>} - API response with { success, data, stats, pagination }
 */
export const getAdminCompanies = async (search = "", status = "", page = 1) => {
  const queryParams = new URLSearchParams();
  
  if (search) queryParams.set("search", search);
  if (status && status !== "all") queryParams.set("status", status);
  if (page) queryParams.set("page", page);

  const queryString = queryParams.toString();
  const path = `/admin/companies${queryString ? `?${queryString}` : ""}`;

  return protectedFetchData(path);
};
