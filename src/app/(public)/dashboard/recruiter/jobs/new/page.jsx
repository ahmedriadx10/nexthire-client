import { getRecruiterWithCompany } from "@/lib/api/RecruiterCompany";

import EmptyCompanyStatus from "@/components/dashboard/recruiter-components/EmptyCompanyStatus";
import CompanyNotApproved from "@/components/dashboard/recruiter-components/CompanyNotApproved";
import RecruiterJobPost from "@/components/dashboard/recruiter-components/RecruiterJobPost";

const RecruiterNewJobPostPage = async () => {

  //TODO : (Plan management) --- In future TODO -- it will be added when recruiter job post feature will be implemented.
  // when i will apply plan management i will update NO -> Yes
  // apply command check below
  // APPLY PLAN MANAGEMENT: NO
  // we have to use the plan management to check if the recruiter can post a job or not. if the recruiter has a free plan then he can post 3 jobs, if he has a growth plan then he can post 10 jobs and if he has an enterprise plan then he can post 50 jobs. so we have to check the plan of the recruiter and then we have to check the number of jobs posted by the recruiter and then we have to check if the recruiter can post a job or not. if the recruiter can post a job then we have to show the job post form otherwise we have to show a message that you cannot post a job until your company is approved.

  const recruiterWithCompanyData = await getRecruiterWithCompany();
  const companyStatus =
    recruiterWithCompanyData?.recruiterCompany?.companyData?.status;
  const companyData = recruiterWithCompanyData?.recruiterCompany?.companyData;

  // Guard: No company registered yet
  if (!recruiterWithCompanyData?.recruiterCompany?.isExistCompany) {
    return (
      <div>
        <EmptyCompanyStatus
          user={recruiterWithCompanyData?.loggedInRecruiter}
        />
      </div>
    );
  }

  return (
    <div>
      {companyStatus === "pending" || companyStatus === "rejected" ? (
        // Company is not yet approved — show status-aware UI
        <CompanyNotApproved
          status={companyStatus}
          companyName={companyData?.name}
        />
      ) : (
        // Company is approved — show the job post form
        <RecruiterJobPost company={companyData} user={recruiterWithCompanyData?.loggedInRecruiter} />
      )}
    </div>
  );
};

export default RecruiterNewJobPostPage;
