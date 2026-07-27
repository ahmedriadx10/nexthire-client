import { protectedFetchData, serverMutation } from "../core/server-manage";

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
