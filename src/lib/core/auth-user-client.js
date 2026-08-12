/**
 * auth-user-client.js — Shared betterAuth User Mutation Utilities
 *
 * Reusable across all role settings pages (recruiter, seeker, admin).
 *
 * Usage (Client Components only):
 *   import { updateUserNameAndImage, changeUserEmail, ... } from "@/lib/core/auth-user-client";
 *
 * All functions return { success: boolean, error?: string }.
 */

"use client";

import { authClient } from "@/lib/auth-client";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Update name and / or avatar image
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Updates the authenticated user's display name and/or profile image via betterAuth.
 *
 * @param {{ name?: string, image?: string | null }} payload
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const updateUserNameAndImage = async (payload) => {
  try {
    const { error } = await authClient.updateUser(payload);
    if (error)
      return {
        success: false,
        error: error.message ?? "Failed to update profile.",
      };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err?.message ?? "Unexpected error updating profile.",
    };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Change email — triggers verification email to the new address
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initiates an email-change request via betterAuth.
 * betterAuth sends a confirmation link to `newEmail`.
 * The email is only updated in the DB after the user clicks the link.
 *
 * Requires `user.changeEmail.enabled = true` in server auth config.
 * Requires a "fresh" session (sensitiveSessionMiddleware). If stale, returns an error.
 *
 * @param {string} newEmail            - The new email address.
 * @param {string} [callbackURL="/"]   - URL to redirect to after verification.
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const changeUserEmail = async (newEmail, callbackURL = "/") => {
  try {
    const { error } = await authClient.changeEmail({ newEmail, callbackURL });
    if (error)
      return {
        success: false,
        error: error.message ?? "Failed to initiate email change.",
      };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err?.message ?? "Unexpected error changing email.",
    };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Resend email verification
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resends a verification email to the given address.
 *
 * Requires `emailVerification.sendVerificationEmail` to be configured on the server.
 *
 * @param {string} email               - Email address to resend verification to.
 * @param {string} [callbackURL="/"]   - URL to redirect to after verification.
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const resendVerificationEmail = async (email, callbackURL = "/") => {
  try {
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL,
    });
    if (error)
      return {
        success: false,
        error: error.message ?? "Failed to send verification email.",
      };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err?.message ?? "Unexpected error sending verification email.",
    };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Delete account
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Permanently deletes the authenticated user's account via betterAuth.
 * Requires `user.deleteUser.enabled = true` in server auth config.
 *
 * For credential accounts: pass `password` for session freshness verification.
 * For OAuth-only accounts (Google, etc.): `password` can be omitted — betterAuth
 * handles this gracefully with `sensitiveSessionMiddleware`.
 *
 * @param {{ password?: string, callbackURL?: string }} [options={}]
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const deleteUserAccount = async ({ password, callbackURL } = {}) => {
  try {
    const payload = {};
    if (password) payload.password = password;
    if (callbackURL) payload.callbackURL = callbackURL;

    const { error } = await authClient.deleteUser(payload);
    if (error)
      return {
        success: false,
        error: error.message ?? "Failed to delete account.",
      };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err?.message ?? "Unexpected error deleting account.",
    };
  }
};
