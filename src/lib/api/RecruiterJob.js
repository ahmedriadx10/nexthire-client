import { serverMutation } from "../core/server-manage";

/**
 * Creates a new job post for the recruiter's approved company.
 * @param {Object} jobData - The job form payload.
 * @returns {Promise<Object>} - API response.
 */
export const createRecruiterJob = async (jobData) => {
  return serverMutation("/recruiter/jobs", jobData, "POST");
};
