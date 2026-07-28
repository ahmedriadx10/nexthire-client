import { protectedFetchData, serverMutation } from "../core/server-manage";
import { getLoggedInUserSession } from "../core/Session";

export const getRecruiterCompany = async (recruiterId) => {

  

  return protectedFetchData(`/recruiter/company/${recruiterId}`);
};

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


export const getRecruiterWithCompany=async ()=>{

const loggedInRecruiter=await getLoggedInUserSession()

const recruiterCompany=await protectedFetchData(`/recruiter/company/${loggedInRecruiter?.id}`)

return {
  loggedInRecruiter,
  recruiterCompany
}




}



