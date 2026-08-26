"use client";

import { useState } from "react";
import JobSummaryCard from "./JobSummaryCard";
import ApplyJobForm from "./ApplyJobForm";
import ApplicationSuccessState from "./ApplicationSuccessState";
import ApplyPermissionBanner from "./ApplyPermissionBanner";

export default function ApplyPageContainer({ job, seekerSession }) {
  const { _id, jobTitle, company, isApplied, permission } = job;
  const companyName = company?.name;
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // If already applied (either from DB or submitted in current session)
  if (isApplied || hasSubmitted) {
    return (
      <div className="space-y-6">
        <JobSummaryCard job={job} />
        <ApplicationSuccessState jobTitle={jobTitle} companyName={companyName} />
      </div>
    );
  }

  // Check permissions: guest or non-seeker
  const isGuest = !seekerSession;
  const canApply = permission?.canApply;

  if (isGuest || !canApply) {
    return (
      <div className="space-y-6">
        <JobSummaryCard job={job} />
        <ApplyPermissionBanner
          jobId={_id}
          isGuest={isGuest}
          role={seekerSession?.role}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Job summary info banner */}
      <JobSummaryCard job={job} />

      {/* Main Application Form */}
      <ApplyJobForm
        jobId={_id}
        jobName={jobTitle}
        companyId={company?.companyId}
        seeker={seekerSession}
        onSuccess={() => setHasSubmitted(true)}
      />
    </div>
  );
}
