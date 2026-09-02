"use server";

import { serverMutation } from "@/lib/core/server-manage";

/**
 * Updates a company's status (approved / rejected / pending).
 * 
 * API: PATCH /admin/company/:companyId
 * 
 * @param {string} companyId - The MongoDB _id of the company.
 * @param {Object} payload - { status: 'approved' | 'rejected' | 'pending' }
 * @returns {Promise<Object>} - API response.
 */
export const updateAdminCompanyStatus = async (companyId, payload) => {
  return serverMutation(`/admin/company/${companyId}`, payload, "PATCH");
};
