/**
 * Shared ImgBB image upload utility.
 *
 * Usage (client components only — not a server action):
 *   import { uploadToImgBB } from "@/lib/core/uploadToImgBB";
 *   const url = await uploadToImgBB(file);
 *
 * Reusable across recruiter, seeker, and admin profile pages.
 */

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Uploads an image File to ImgBB and returns the hosted URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The URL of the uploaded image.
 * @throws {Error} If validation fails or the upload is unsuccessful.
 */
export const uploadToImgBB = async (file) => {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files (PNG, JPG, WEBP, etc.) are allowed.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("Image size must be less than 5 MB.");
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ImgBB API key is missing. Please set NEXT_PUBLIC_IMGBB_API_KEY in your environment."
    );
  }

  const body = new FormData();
  body.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error(`ImgBB upload failed with status ${response.status}.`);
  }

  const result = await response.json();

  if (!result?.data?.url) {
    throw new Error("Invalid response from ImgBB — no URL returned.");
  }

  return result.data.url;
};
