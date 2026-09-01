'use server';

import { serverMutation } from "@/lib/core/server-manage";

export const updateSeekerProfile = async (seekerId, payload) => {
  return serverMutation(`/seeker/profile/${seekerId}`, payload, "PATCH");
};
