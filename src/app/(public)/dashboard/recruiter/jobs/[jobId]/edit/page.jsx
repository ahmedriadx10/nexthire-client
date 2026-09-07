import { getRecruiterJobById } from "@/lib/api/RecruiterJob";
import RecruiterJobEdit from "@/components/dashboard/recruiter-components/RecruiterJobEdit";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { jobId } = await params;
  const job = await getRecruiterJobById(jobId).catch(() => null);

  const jobTitle = job?.jobTitle || job?.title || "Job Listing";

  return constructMetadata({
    title: `Edit ${jobTitle} | NextHire Recruiter`,
    description: `Update parameters, requirements, location, and details for ${jobTitle}.`,
    noIndex: true,
  });
}

const RecruiterJobPostUpdatePage = async ({ params }) => {
  const { jobId } = await params;

  const jobData = await getRecruiterJobById(jobId);

  return (
    <div>
      <RecruiterJobEdit jobData={jobData} />
    </div>
  );
};

export default RecruiterJobPostUpdatePage;
