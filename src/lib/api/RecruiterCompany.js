import { protectedFetchData, serverMutation } from "../core/server-manage";
import { getLoggedInUserSession } from "../core/Session";

// The function has been optimized to fetch both the logged-in recruiter and their company data in a single API call, reducing the number of requests and improving performance.
// export const getRecruiterCompany = async (recruiterId) => {
//   return protectedFetchData(`/recruiter/company/${recruiterId}`);
// };

export const registerCompany = async (companyData) => {
  return serverMutation("/recruiter/company", companyData, "POST");
};

export const updateRecruiterCompany = async (companyId, companyData) => {
  return serverMutation(
    `/recruiter/company/${companyId}`,
    companyData,
    "PATCH",
  );
};

export const getRecruiterWithCompany = async () => {
  const loggedInRecruiter = await getLoggedInUserSession();

  const recruiterCompany = await protectedFetchData(
    `/recruiter/company/${loggedInRecruiter?.id}`,
  );

  return {
    loggedInRecruiter,
    recruiterCompany,
  };
};
