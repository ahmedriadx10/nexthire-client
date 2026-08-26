import Link from "next/link";
import { getJobDetails } from "@/lib/api/public-api/jobs";
import { getLoggedInUserSession } from "@/lib/core/Session";
import ApplyPageContainer from "@/components/browse-jobs/apply/ApplyPageContainer";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export const revalidate = 0;

const JobApplyPage = async ({ params }) => {
  const { jobId } = await params;

  // Fetch job details (includes isApplied and permission.canApply for the logged-in user)
  const job = await getJobDetails(jobId);

  // Fetch logged-in user session
  const seekerSession = await getLoggedInUserSession();

  // console.log('seeker session',seekerSession)

  // If job does not exist or was deleted
  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 mb-4">
          <FiAlertCircle className="text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Job Not Found</h1>
        <p className="text-zinc-400 max-w-md mb-6 text-sm">
          The job listing you are trying to apply for does not exist or may have been removed.
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
      <div className="max-w-4xl mx-auto">
        <ApplyPageContainer job={job} seekerSession={seekerSession} />
      </div>
    </div>
  );
};

export default JobApplyPage;