"use server";

import { notFound, redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";
import { ServerError } from "./server-error";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://nexthire-server-nine.vercel.app";

if (
  process.env.NODE_ENV === "development" &&
  !process.env.NEXT_PUBLIC_BASE_URL
) {
  console.warn(
    "[server-manage] NEXT_PUBLIC_BASE_URL is not set. " +
      "Falling back to the production URL — requests may fail locally."
  );
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Safely parse a response body.
 * Prefers JSON when the Content-Type header indicates it; falls back to text.
 * Never throws — returns null on any parse failure.
 *
 * @param {Response} response
 * @returns {Promise<unknown>}
 */
const parseBody = async (response) => {
  try {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch {
    return null;
  }
};

/**
 * Centralised HTTP response handler.
 *
 * IMPORTANT: Next.js `redirect()` and `notFound()` throw special sentinel
 * errors that must propagate untouched. They are called BEFORE any try/catch
 * block — do not move them inside one.
 *
 * For all remaining non-2xx responses a `ServerError` is thrown so callers
 * can handle failures explicitly without inspecting raw `Response` objects.
 *
 * @param {Response} response
 * @returns {Promise<unknown>} Parsed response body
 */
const handleStatusCode = async (response) => {
  // --- Next.js navigation throws (must NOT be caught) ---
  if (response.status === 401) redirect("/unauthorized");
  if (response.status === 403) redirect("/forbidden");
  if (response.status === 404) notFound();

  // --- Parse body before deciding what to return / throw ---
  const body = await parseBody(response);

  if (!response.ok) {
    throw new ServerError(
      `Request failed: ${response.status} ${response.statusText}`,
      { status: response.status, statusText: response.statusText, body }
    );
  }

  return body;
};

/**
 * Returns true for errors that must propagate without re-wrapping.
 * Covers our own ServerError and Next.js navigation sentinels
 * (which carry a `digest` property).
 *
 * @param {unknown} error
 * @returns {boolean}
 */
const isPassthroughError = (error) =>
  error instanceof ServerError ||
  (typeof error === "object" && error !== null && "digest" in error);

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Retrieves the Bearer token header for the current session.
 * Returns an empty object for unauthenticated (guest) users.
 *
 * @returns {Promise<Record<string, string>>}
 */
export const getAuthHeader = async () => {
  try {
    const token = await auth.api.getToken({ headers: await headers() });
    if (!token?.token) return {};
    return { authorization: `Bearer ${token.token}` };
  } catch (error) {
    // Token lookup failed — treat the request as a guest session.
    // A warning (not an error) is logged so auth misconfigurations remain
    // visible in server logs without exposing any sensitive data.
    console.warn(
      "[server-manage] Could not retrieve auth token:",
      error?.message ?? error
    );
    return {};
  }
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch data from the server without authentication headers.
 *
 * @param {string} path - API path (appended to baseUrl)
 * @returns {Promise<unknown>} Parsed response body
 * @throws {ServerError} On non-2xx responses or network failures
 */
export const fetchData = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`);
    return await handleStatusCode(res);
  } catch (error) {
    if (isPassthroughError(error)) throw error;
    throw new ServerError(
      `Network error while fetching "${path}": ${error.message}`,
      { status: 0 }
    );
  }
};

/**
 * Fetch data from the server with the current user's auth token.
 *
 * @param {string} path - API path (appended to baseUrl)
 * @returns {Promise<unknown>} Parsed response body
 * @throws {ServerError} On non-2xx responses or network failures
 */
export const protectedFetchData = async (path) => {
  try {
    const authHeader = await getAuthHeader();
    const res = await fetch(`${baseUrl}${path}`, {
      headers: { ...authHeader },
    });
    return await handleStatusCode(res);
  } catch (error) {
    if (isPassthroughError(error)) throw error;
    throw new ServerError(
      `Network error while fetching (protected) "${path}": ${error.message}`,
      { status: 0 }
    );
  }
};

/**
 * Send a mutating request (POST, PUT, PATCH, …) to the server.
 *
 * @param {string}  path   - API path (appended to baseUrl)
 * @param {unknown} data   - Request body (will be JSON-serialised)
 * @param {string}  method - HTTP method (default: "POST")
 * @returns {Promise<unknown>} Parsed response body
 * @throws {ServerError} On non-2xx responses or network failures
 */
export const serverMutation = async (path, data, method = "POST") => {
  try {
    const authHeader = await getAuthHeader();
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "content-type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify(data),
    });
    return await handleStatusCode(res);
  } catch (error) {
    if (isPassthroughError(error)) throw error;
    throw new ServerError(
      `Network error during ${method} to "${path}": ${error.message}`,
      { status: 0 }
    );
  }
};

/**
 * Send a DELETE request to the server.
 *
 * @param {string} path   - API path (appended to baseUrl)
 * @param {string} method - HTTP method (default: "DELETE")
 * @returns {Promise<unknown>} Parsed response body
 * @throws {ServerError} On non-2xx responses or network failures
 */
export const serverDataDelete = async (path, method = "DELETE") => {
  try {
    const authHeader = await getAuthHeader();
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: { ...authHeader },
    });
    return await handleStatusCode(res);
  } catch (error) {
    if (isPassthroughError(error)) throw error;
    throw new ServerError(
      `Network error during ${method} to "${path}": ${error.message}`,
      { status: 0 }
    );
  }
};
