import { getAuthHeader } from "@/lib/core/server-manage";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

//DRY Suggetion
/**
 * instead using raw fetch for fetching jobs data you can use protectedFetch data from @/lib/core/server-manage.js
 * update the getBrowseJobs function to follow DRY principle
 */


/**
 * Fetch paginated, filtered jobs for the browse-jobs page.
 *
 * Sends a POST to /jobs/search with the search body.
 * Includes the auth header so the backend can resolve:
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
    const authHeader = await getAuthHeader();

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

    const res = await fetch(`${baseUrl}/jobs/search`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

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
