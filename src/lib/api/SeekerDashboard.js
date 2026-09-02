import { protectedFetchData } from "../core/server-manage";

/**
 * Fetches the seeker's dashboard data from the backend API.
 * Endpoint: /dashboard/seeker/:seekerId
 *
 * @param {string} seekerId - The logged-in seeker's user ID.
 * @returns {Promise<Object|null>} - API response containing stats, profile, latestJobs, and latestApplications.
 */
export const getSeekerDashboardData = async (seekerId) => {
  if (!seekerId) return null;
  return protectedFetchData(`/dashboard/seeker/${seekerId}`);
};
