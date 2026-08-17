import { serverMutation } from "@/lib/core/server-manage";

/**
 * Fetch paginated, filtered jobs for the browse-jobs page.
 *
 * Sends a POST to /jobs/search with the search body.
 * Uses serverMutation to automatically include authorization header
 * so the backend can resolve:
 *  - job.isSaved (per-job boolean for authenticated seekers)
 *  - permission.canSaveJob (false for guests / recruiters / admins)
 *
 * @param {{ search?: string, jobType?: string|string[], sortBy?: string, postedWithin?: string, page?: number }} params
 * @returns {Promise<{ jobs: Array, pagination: Object, permission: Object }>}
 */
export const getBrowseJobs = async ({
  search = "",
  jobType,
  sortBy = "newest",
  postedWithin = "all-time",
  page = 1,
} = {}) => {
  try {
    // Normalise jobType — URL searchParams can give a single string or an array
    const jobTypeArray = Array.isArray(jobType)
      ? jobType
      : jobType
      ? [jobType]
      : [];

    const body = {
      search,
      jobType: jobTypeArray,
      sortBy,
      postedWithin,
      page: Number(page),
    };

    const data = await serverMutation("/jobs/search", body, "POST");

    return {
      jobs: data?.data?.jobs || [],
      pagination: data?.data?.pagination || {
        currentPage: 1,
        jobsPerPage: 10,
        totalJobs: 0,
        totalPages: 0,
      },
      permission: data?.data?.permission || { canSaveJob: false },
    };
  } catch (error) {
    console.error("Error fetching browse jobs:", error);
    return {
      jobs: [],
      pagination: { currentPage: 1, jobsPerPage: 10, totalJobs: 0, totalPages: 0 },
      permission: { canSaveJob: false },
    };
  }
};
