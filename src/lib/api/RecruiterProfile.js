import { protectedFetchData } from "../core/server-manage"
import { getLoggedInUserSession } from "../core/Session"

export const getRecruiterWithProfile=async ()=>{


const loggedInRecruiter=await getLoggedInUserSession()
const recruiterProfile=await protectedFetchData(`/recruiter/profile/${loggedInRecruiter?.id}`)


return {
  recruiterData:loggedInRecruiter,
  recruiterProfile
}


}