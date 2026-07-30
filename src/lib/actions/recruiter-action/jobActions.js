"use server";

import { serverDataDelete, serverMutation } from "@/lib/core/server-manage";

/**
 * Updates a recruiter's job post — handles both status changes and full edits.
 * A single unified PATCH action as specified in the comments:
 *   updateJobStatusOrDetails(jobId, { status: "closed" })
 *   updateJobStatusOrDetails(jobId, { title: "New Title", description: "..." })
 *
 * @param {string} jobId - The MongoDB _id of the job to update.
 * @param {Object} payload - Partial job fields to update (e.g. { status } or full form data).
 * @returns {Promise<Object>} - API response.
 */
export const updateJobStatusOrDetails = async (jobId, payload) => {
  return serverMutation(`/recruiter/jobs/${jobId}`, payload, "PATCH");
};

/**
 * Permanently deletes a recruiter's job post.
 *
 * @param {string} jobId - The MongoDB _id of the job to delete.
 * @returns {Promise<Object>} - API response.
 */
export const deleteRecruiterJob = async (jobId) => {
  return serverDataDelete(`/recruiter/jobs/${jobId}`);
};
