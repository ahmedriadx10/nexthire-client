"use server";

import { serverMutation, protectedFetchData } from "@/lib/core/server-manage";

/**
 * Fetches paginated applications and stats for an authenticated job seeker.
 *
 * @param {Object} options
 * @param {string} options.seekerId - MongoDB _id of the job seeker.
 * @param {number|string} [options.page=1] - Current page number.
 * @param {string} [options.search=""] - Job title search term.
 * @param {string} [options.status=""] - Status filter option.
 * @returns {Promise<Object>} API response with stats, applications, and pagination metadata.
 */
export const getSeekerApplications = async ({ seekerId, page = 1, search = "", status = "" } = {}) => {
  if (!seekerId) {
    return {
      success: false,
      data: {
        stats: {
          totalApplied: 0,
          totalShortlisted: 0,
          totalInterview: 0,
          successRate: 0,
        },
        applications: [],
        pagination: {
          currentPage: 1,
          limit: 10,
          totalApplications: 0,
          totalPages: 1,
        },
      },
    };
  }

  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (search && search.trim()) queryParams.append("search", search.trim());
  if (status && status.trim() && status.toLowerCase() !== "all") {
    queryParams.append("status", status.trim().toLowerCase());
  }

  const queryString = queryParams.toString();
  const path = `/seeker/applications/${seekerId}${queryString ? `?${queryString}` : ""}`;

  return protectedFetchData(path);
};

/**
 * Updates application status for a job seeker (e.g. from 'applied' to 'withdrawn').
 *
 * @param {string} applicationId - The MongoDB _id of the application.
 * @param {string} status - New status string (e.g. 'withdrawn').
 * @returns {Promise<Object>} API response.
 */
export const updateSeekerApplicationStatus = async (applicationId, status) => {
  if (!applicationId) {
    throw new Error("Application ID is required");
  }
  if (!status) {
    throw new Error("Status is required");
  }

  return serverMutation(`/seeker/applications/${applicationId}`, { status }, "PATCH");
};
