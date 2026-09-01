import { protectedFetchData } from "../core/server-manage";
import { getLoggedInUserSession } from "../core/Session";

export const getSeekerWithProfile = async () => {
  const loggedInSeeker = await getLoggedInUserSession();
  let seekerProfile = null;

  if (loggedInSeeker?.id) {
    try {
      seekerProfile = await protectedFetchData(`/seeker/profile/${loggedInSeeker.id}`);
    } catch (err) {
      console.error("Error fetching seeker profile:", err);
    }
  }

  return {
    seekerData: loggedInSeeker,
    seekerProfile:seekerProfile?.data || null,
  };
};
