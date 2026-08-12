'use server'

import { serverMutation } from "@/lib/core/server-manage"

export const updateRecruiterProfile=async(recruiterId,payload)=>{

  return serverMutation(`/recruiter/profile/${recruiterId}`,payload,'PATCH')


}