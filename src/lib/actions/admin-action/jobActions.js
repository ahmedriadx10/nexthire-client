"use server";

import { serverDataDelete } from "@/lib/core/server-manage";

/**
 * Deletes a job posting by ID (admin only).
 * 
 * API: DELETE /admin/job/:jobId
 * 
 * @param {string} jobId - The MongoDB _id of the job.
 * @returns {Promise<Object>} - API response object.
 */
export const deleteAdminJob = async (jobId) => {
  return serverDataDelete(`/admin/job/${jobId}`);
};
