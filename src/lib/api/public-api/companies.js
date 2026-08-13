import { fetchData } from "@/lib/core/server-manage";

/**
 * Fetch companies list with optional search term and page number.
 * 
 * @param {string} search - Search query parameter for matching company name, industry, etc.
 * @param {number|string} page - Current page number
 * @returns {Promise<{ totalCompany: number, companyData: Array }>}
 */
export const getCompanies = async (search = "", page = 1) => {
  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (page) queryParams.set("page", page);

    const queryString = queryParams.toString();
    const endpoint = `/companies${queryString ? `?${queryString}` : ""}`;

    const data = await fetchData(endpoint);

    return {
      totalCompany: data?.totalCompany || 0,
      companyData: Array.isArray(data?.companyData) ? data.companyData : [],
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      totalCompany: 0,
      companyData: [],
    };
  }
};
