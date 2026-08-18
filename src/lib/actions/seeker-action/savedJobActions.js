"use server";

import { serverMutation, serverDataDelete } from "@/lib/core/server-manage";

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
 * @param {string} jobId - MongoDB _id of the job to unsave.
 * @returns {Promise<Object>} API response.
 */
export const deleteSavedSeekerJob = async ({userId,jobId}) => {
  return serverDataDelete(`/seeker/saved-jobs/${userId}/${jobId}`);
};
