import { protectedFetchData } from "../core/server-manage";

/**
 * Fetches dashboard statistics, recent applications, and company info for a recruiter.
 * Endpoint: /dashboard/recruiter/:recruiterId
 * 
 * @param {string} recruiterId - The logged-in recruiter's ID.
 * @returns {Promise<Object>} - API response containing stats, recentApplications, and company.
 */
export const getRecruiterDashboardData = async (recruiterId) => {
  if (!recruiterId) return null;
  return protectedFetchData(`/dashboard/recruiter/${recruiterId}`);
};
