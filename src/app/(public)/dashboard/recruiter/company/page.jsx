import CompanyManage from "@/components/dashboard/recruiter-components/CompanyManage";
import EmptyCompanyStatus from "@/components/dashboard/recruiter-components/EmptyCompanyStatus";
import {
 
  getRecruiterWithCompany,
} from "@/lib/api/RecruiterCompany";


const RecruiteMyCompanyPage = async () => {
  const recruiterDataWithCompany = await getRecruiterWithCompany();

  console.log("recriter data with company here", recruiterDataWithCompany);

  return (
    <div className=" px-4 py-8 text-white">
      {!recruiterDataWithCompany?.recruiterCompany?.isExistCompany && (
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

      {recruiterDataWithCompany?.recruiterCompany?.isExistCompany ? (
        <CompanyManage
          company={recruiterDataWithCompany?.recruiterCompany?.companyData}
        />
      ) : (
        <EmptyCompanyStatus
          user={recruiterDataWithCompany?.loggedInRecruiter}
        />
      )}
    </div>
  );
};

export default RecruiteMyCompanyPage;
