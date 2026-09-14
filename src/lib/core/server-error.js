/**
 * Custom error thrown by server-manage helpers when the remote server
 * returns a non-2xx response or when a network-level failure occurs.
 *
 * Extracting this into its own (non-"use server") module lets both server
 * and client code import it for `instanceof` checks without Turbopack
 * complaining about class exports on a server boundary.
 *
 * @property {number}  status     - HTTP status code (0 for network errors)
 * @property {string}  statusText - HTTP status text
 * @property {unknown} body       - Parsed response body (JSON or plain text), if any
 */
export class ServerError extends Error {
  constructor(message, { status = 0, statusText = "", body = null } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}
