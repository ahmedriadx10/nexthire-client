import { protectedFetchData } from "@/lib/core/server-manage";

/**
 * Fetches overall platform stats and analytics for the admin dashboard.
 * Endpoint: /admin/dashboard
 * 
 * @returns {Promise<Object>} - API response containing { success, stats, analytics }
 */
export const getAdminDashboardData = async () => {
  try {
    const data = await protectedFetchData("/dashboard/admin");
    return data;
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return null;
  }
};
