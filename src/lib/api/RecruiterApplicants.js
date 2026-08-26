import { protectedFetchData } from "../core/server-manage";

/**
 * Fetches applicants for a specific recruiter job post with optional status filter and pagination.
 *
 * @param {string} jobId - The MongoDB _id of the job post.
 * @param {Object} options - Filtering and pagination options.
 * @param {string} [options.status] - Optional status filter ("applied", "screening", "shortlisted", "interview", "hired", "rejected").
 * @param {number|string} [options.page=1] - Current page number.
 * @returns {Promise<Object>} - API response containing applications array and pagination details.
 */
export const getRecruiterJobApplicants = async (jobId, { status, page = 1 } = {}) => {
  const queryParams = new URLSearchParams();

  if (page) {
    queryParams.append("page", page.toString());
  }

  if (status && status.trim() && status.toLowerCase() !== "all") {
    queryParams.append("status", status.trim());
  }

  const queryString = queryParams.toString();
  const endpoint = `/recruiter/job-applicants/${jobId}${queryString ? `?${queryString}` : ""}`;

  return protectedFetchData(endpoint);
};
