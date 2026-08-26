"use server";

import { serverMutation } from "@/lib/core/server-manage";

/**
 * Updates the application status of a job seeker.
 *
 * @param {string} applicationId - The MongoDB _id of the application (or seeker application entry).
 * @param {string} status - New status ("applied", "screening", "shortlisted", "interview", "hired", "rejected").
 * @returns {Promise<Object>} API response.
 */
export const updateApplicantStatus = async (applicationId, status) => {
  if (!applicationId) {
    throw new Error("Application ID is required");
  }
  if (!status) {
    throw new Error("Status is required");
  }

  return serverMutation(`/recruiter/job-applicants/${applicationId}`, { status }, "PATCH");
};
