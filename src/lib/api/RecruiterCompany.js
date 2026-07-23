import { protectedFetchData } from "../core/server-manage";

export const getRecruiterCompany = async (recruiterId) => {
  return protectedFetchData(`/recruiter/company/${recruiterId}`);
};
