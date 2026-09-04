"use server";

import { serverDataDelete, serverMutation } from "@/lib/core/server-manage";

/**
 * Updates a user's role (admin only).
 * 
 * API: PATCH /admin/user/:userId
 * 
 * @param {string} userId - The MongoDB _id of the user.
 * @param {string} newRole - Target role ('seeker' | 'recruiter' | 'admin')
 * @returns {Promise<Object>} - API response object.
 */
export const updateAdminUserRole = async (userId, newRole) => {
  return serverMutation(`/admin/user/${userId}`, { role: newRole }, "PATCH");
};

/**
 * Deletes a user account (admin only).
 * 
 * API: DELETE /admin/user/:userId
 * 
 * @param {string} userId - The MongoDB _id of the user.
 * @returns {Promise<Object>} - API response object.
 */
export const deleteAdminUser = async (userId) => {
  return serverDataDelete(`/admin/user/${userId}`);
};
