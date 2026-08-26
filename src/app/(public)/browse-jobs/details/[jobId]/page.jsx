import { getJobDetails } from "@/lib/api/public-api/jobs";
import JobHeader from "@/components/browse-jobs/details/JobHeader";
import JobOverviewGrid from "@/components/browse-jobs/details/JobOverviewGrid";
import JobDetailsContent from "@/components/browse-jobs/details/JobDetailsContent";
import CompanyInfoCard from "@/components/browse-jobs/details/CompanyInfoCard";
import Link from "next/link";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export const revalidate = 0; // Ensures fresh permission and isApplied resolution per request

const JobDetailsPage = async ({ params }) => {
  const { jobId } = await params;

  const job = await getJobDetails(jobId);

  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 mb-4">
          <FiAlertCircle className="text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Job Not Found</h1>
        <p className="text-zinc-400 max-w-md mb-6">
          The job listing you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all"
        >
          <FiArrowLeft />
          <span>Back to Browse Jobs</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section with Job title, Company logo & Apply Action button */}
        <JobHeader job={job} />

        {/* Quick Stats / Overview Grid */}
        <JobOverviewGrid job={job} />

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Responsibilities & Requirements (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            <JobDetailsContent
              responsibilities={job?.responsibilities}
              requirements={job?.requirements}
            />
          </div>

          {/* Right Column: Company Info Card (1 col on desktop) */}
          <div className="lg:col-span-1">
            <CompanyInfoCard company={job?.company} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;