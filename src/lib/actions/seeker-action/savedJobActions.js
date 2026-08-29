"use server";

import { serverMutation, serverDataDelete, protectedFetchData } from "@/lib/core/server-manage";

/**
 * Saves a job post for an authenticated job seeker.
 *
 * @param {Object} payload - Details of the job being saved e.g. { jobId, jobTitle, companyName }
 * @returns {Promise<Object>} API response.
 */
export const saveSeekerJob = async (payload) => {
  return serverMutation("/seeker/saved-jobs", payload, "POST");
};

/**
 * Removes a job post from the seeker's saved jobs list.
 *
 * @param {Object} params
 * @param {string} params.userId - MongoDB _id of the user.
 * @param {string} params.jobId - MongoDB _id of the job to unsave.
 * @returns {Promise<Object>} API response.
 */
export const deleteSavedSeekerJob = async ({ userId, jobId }) => {
  return serverDataDelete(`/seeker/saved-jobs/${userId}/${jobId}`);
};

/**
 * Fetches paginated saved jobs for an authenticated seeker.
 *
 * @param {Object} [options]
 * @param {string} [options.userId] - Seeker's user ID.
 * @param {number|string} [options.page=1] - Current page number.
 * @param {number|string} [options.limit=10] - Items per page limit.
 * @param {string} [options.search=""] - Job title search term.
 * @returns {Promise<Object>} API response with data array and pagination metadata.
 */
export const getSeekerSavedJobs = async ({ userId, page = 1,  search = "" } = {}) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page);

  if (search) {
    queryParams.append("search", search);
    // queryParams.append("jobName", search);
  }

  const path = userId
    ? `/seeker/saved-jobs/${userId}?${queryParams.toString()}`
    : `/seeker/saved-jobs?${queryParams.toString()}`;

  return protectedFetchData(path);
};
