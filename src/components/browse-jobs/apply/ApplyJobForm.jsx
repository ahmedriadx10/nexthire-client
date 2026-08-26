"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { applyForJob } from "@/lib/actions/seeker-action/applyJobAction";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLink,
  FiFileText,
  FiSend,
  FiLoader,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";

export default function ApplyJobForm({ jobId,jobName, seeker, onSuccess ,companyId}) {
  const [formData, setFormData] = useState({
    name: seeker?.name || "",
    email: seeker?.email || "",
    phone: "",
    resumeLink: "",
    message: "",
  });

 

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation
    const phoneClean = formData.phone.trim();
    const phoneRegex = /^[\d\+\-\s\(\)]{7,20}$/;
    if (!phoneClean) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = "Please enter a valid phone number (min 7 digits).";
    }

    // Resume Link validation
    const resumeUrl = formData.resumeLink.trim();
    if (!resumeUrl) {
      newErrors.resumeLink = "Resume link (Google Drive, Dropbox, etc.) is required.";
    } else {
      try {
        const parsedUrl = new URL(
          resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")
            ? resumeUrl
            : `https://${resumeUrl}`
        );
        if (!parsedUrl.hostname || !parsedUrl.hostname.includes(".")) {
          newErrors.resumeLink = "Please provide a valid web URL for your resume.";
        }
      } catch (err) {
        newErrors.resumeLink = "Please enter a valid URL (e.g., https://drive.google.com/...)";
      }
    }

    // Cover letter / Message validation (optional, but if filled, must be meaningful)
    if (formData.message.trim() && formData.message.trim().length < 10) {
      newErrors.message = "Cover letter message should be at least 10 characters if provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for that field dynamically
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Normalize resume link to have protocol
      let formattedResumeLink = formData.resumeLink.trim();
      if (
        !formattedResumeLink.startsWith("http://") &&
        !formattedResumeLink.startsWith("https://")
      ) {
        formattedResumeLink = `https://${formattedResumeLink}`;
      }

      const payload = {
        userId:seeker?.id,
        jobId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        // resumeLink: formattedResumeLink,
        resumeDriveLink: formattedResumeLink,
        message: formData.message.trim(),
        // coverLetter: formData.message.trim(),
        companyId,
        jobName
      };

      const res = await applyForJob(jobId, payload);

      if (res?.success || res?.status === 200 || res?.status === 201 || res?.data) {
        toast.success("Application submitted successfully!");
        if (onSuccess) {
          onSuccess(res?.data || payload);
        }
      } else {
        const errorMsg = res?.message || "Failed to submit application. Please try again.";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast.error(error?.message || "Something went wrong while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Application Form</h3>
        <p className="text-sm text-zinc-400 mt-1">
          Please fill in your details accurately. The recruiter will use this information to evaluate your application.
        </p>

       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Full Name <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <FiUser className="text-base" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 text-white text-sm border focus:outline-none transition-all ${
                errors.name
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <FiAlertCircle className="shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Email Address <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <FiMail className="text-base" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 text-white text-sm border focus:outline-none transition-all ${
                errors.email
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <FiAlertCircle className="shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Phone Number <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <FiPhone className="text-base" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 8900"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 text-white text-sm border focus:outline-none transition-all ${
                errors.phone
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <FiAlertCircle className="shrink-0" />
              <span>{errors.phone}</span>
            </p>


          )}
        </div>

        {/* Resume Link */}
        <div className="space-y-2">
          <label htmlFor="resumeLink" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Resume Drive / Portfolio Link <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <FiLink className="text-base" />
            </div>
            <input
              type="url"
              id="resumeLink"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/file/d/..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 text-white text-sm border focus:outline-none transition-all ${
                errors.resumeLink
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
          </div>
          {errors.resumeLink ? (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <FiAlertCircle className="shrink-0" />
              <span>{errors.resumeLink}</span>
            </p>
          ) : (
            <p className="text-[11px] text-zinc-500">
              Provide a viewable link to your resume (Google Drive, Dropbox, OneDrive, Notion, or personal site).
            </p>
          )}
        </div>
      </div>

      {/* Cover Letter / Additional Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Cover Letter / Message <span className="text-zinc-500 font-normal lowercase">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3.5 flex items-start pointer-events-none text-zinc-500">
            <FiFileText className="text-base" />
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell the recruiter why you are a great fit for this role..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 text-white text-sm border focus:outline-none transition-all ${
              errors.message
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            }`}
          />
        </div>
        {errors.message && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <FiAlertCircle className="shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-zinc-800">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <FiSend className="text-base" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
