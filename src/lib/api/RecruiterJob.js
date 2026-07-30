import { protectedFetchData, serverMutation } from "../core/server-manage";

/**
 * Creates a new job post for the recruiter's approved company.
 * @param {Object} jobData - The job form payload.
 * @returns {Promise<Object>} - API response.
 */
export const createRecruiterJob = async (jobData) => {
  return serverMutation("/recruiter/jobs", jobData, "POST");
};

/**
 * Fetches paginated job posts for a specific recruiter.
 * @param {string} recruiterId - The logged-in recruiter's ID.
 * @param {number|string} page - The current page number (default: 1).
 * @returns {Promise<{ jobs: Array, totalJobs: number }>} - API response.
 */
export const getRecruiterJobs = async (recruiterId, page = 1) => {
  return protectedFetchData(`/recruiter/jobs/${recruiterId}?page=${page}`);
};
