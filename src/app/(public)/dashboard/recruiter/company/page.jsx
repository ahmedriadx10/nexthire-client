import CompanyManage from "@/components/dashboard/recruiter-components/CompanyManage";
import EmptyCompanyStatus from "@/components/dashboard/recruiter-components/EmptyCompanyStatus";
import { getRecruiterCompany } from "@/lib/api/RecruiterCompany";
import { getLoggedInUserSession } from "@/lib/core/Session";

const RecruiteMyCompanyPage = async () => {
  const loggedInRecruiter = await getLoggedInUserSession();
  // console.log('user session',loggedInRecruiter)

  const recruiterCompanyData = await getRecruiterCompany(loggedInRecruiter?.id);

  // console.log("recruiter company data", recruiterCompanyData);
  return (
    <div className=" px-4 py-8 text-white">
      {!recruiterCompanyData?.isExistCompany && (
        <div className="mb-8 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            My Company
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Manage your organization&apos;s profile details, branding assets,
            and verification status.
          </p>
        </div>
      )}

      {recruiterCompanyData?.isExistCompany ? (
        <CompanyManage company={recruiterCompanyData?.companyData} />
      ) : (
        <EmptyCompanyStatus user={loggedInRecruiter} />
      )}
    </div>
  );
};

export default RecruiteMyCompanyPage;
