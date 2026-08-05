import { getRecruiterJobById } from "@/lib/api/RecruiterJob";
import RecruiterJobEdit from "@/components/dashboard/recruiter-components/RecruiterJobEdit";

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
