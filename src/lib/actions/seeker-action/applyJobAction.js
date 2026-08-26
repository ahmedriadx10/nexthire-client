"use server";

import { serverMutation } from "@/lib/core/server-manage";

/**
 * Submits job application for an authenticated job seeker.
 *
 * @param {string} jobId - MongoDB _id of the job post.
 * @param {Object} payload - Application details { name, email, phone, resumeLink, message }
 * @returns {Promise<Object>} API response.
 */
export const applyForJob = async (jobId, payload) => {
  return serverMutation(`/seeker/apply-job/${jobId}`, payload, "POST");
};
