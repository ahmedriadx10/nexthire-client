import { getRecruiterWithCompany } from "@/lib/api/RecruiterCompany";

import EmptyCompanyStatus from "@/components/dashboard/recruiter-components/EmptyCompanyStatus";
const RecruiterPostNewJobPage = async () => {
  //TODO : (Plan management)
  // we have to use the plan management to check if the recruiter can post a job or not. if the recruiter has a free plan then he can post 3 jobs, if he has a growth plan then he can post 10 jobs and if he has an enterprise plan then he can post 50 jobs. so we have to check the plan of the recruiter and then we have to check the number of jobs posted by the recruiter and then we have to check if the recruiter can post a job or not. if the recruiter can post a job then we have to show the job post form otherwise we have to show a message that you cannot post a job until your company is approved.
  // for security purpose we will made a next.js server function to check the plan and the number of jobs posted by the recruiter and then we will return the result to the client side. so that we can avoid the security issue. besides we will also check the plan and the number of jobs posted by the recruiter in the server side when the recruiter try to post a job. so that we can avoid the security issue.

  // to manage the plan in the server side i will make an/more api route and load the data inside server function then

  const recruiterWithCompanyData = await getRecruiterWithCompany();
  const companyStatus =
    recruiterWithCompanyData?.recruiterCompany?.companyData?.status;
  const companyData = recruiterWithCompanyData?.recruiterCompany?.companyData;

  if (!companyData?.isExistCompany) {
    return (
      <div>
        {/* here empthy company  component*/}

        <EmptyCompanyStatus
          user={recruiterWithCompanyData?.loggedInRecruiter}
        />
      </div>
    );
  }

  return (
    <div>
      {companyStatus === "pending" || companyStatus === "rejected" ? (
        <div>
          An UI have to show that will indicate the company status and status
          based ui - like if pending then show a message that your company is
          under review and you cannot post a job until it is approved. on the
          other hand if rejected then show a message that your company is
          rejected and you cannot post a job until it is approved. and also
          provide an email to contact support for further assistance.
        </div>
      ) : (
        <div>
          {/* job post form will appear here and how the flow work i commented  */}

          <h2>Recruiter Post New Job</h2>
          {/* A form divided into sections:

**Job Info:**

* Job Title, Job Category, Job Type (Full-time / Part-time / Remote / Contract / Internship)  
* Salary Range (Min & Max), Currency  
* Location (City, Country) or Remote toggle  
* Application Deadline

**Job Description:**

* Responsibilities (rich text or textarea)  
* Requirements (rich text or textarea)  
* Benefits (optional)

**Company:** Auto-filled from the Recruiter's registered company (must be approved to post). Posting is allowed only while the company is within its plan's active job limit (3 / 10 / 50 for Free / Growth / Enterprise).

On submit: save job with status active, link to Recruiter's company, and make it publicly visible.
 */}
        </div>
      )}
    </div>
  );
};

export default RecruiterPostNewJobPage;
