import { getSeekerWithProfile } from "@/lib/api/SeekerProfile";
import SeekerAccountCard from "@/components/dashboard/seeker-components/SeekerAccountCard";
import SeekerProfileCard from "@/components/dashboard/seeker-components/SeekerProfileCard";

export const metadata = {
  title: "Profile Settings | NextHire Seeker",
  description:
    "Manage your job seeker profile — update your headline, bio, skills, resume Drive link, portfolio link, contact details, social links, and cover banner.",
};

const SeekerProfileSettingsPage = async () => {
  const { seekerData, seekerProfile } = await getSeekerWithProfile();

  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
          Profile Settings
        </h1>
        <p className="text-sm text-zinc-500 font-light mt-1.5">
          Keep your seeker profile up-to-date to impress recruiters and hiring managers.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Account Info (betterAuth name & avatar edit) */}
        <div className="xl:col-span-4">
          <SeekerAccountCard seekerData={seekerData} />
        </div>

        {/* Right: Profile Details (editable) */}
        <div className="xl:col-span-8">
          <SeekerProfileCard
            seekerId={seekerData?.id}
            seekerProfile={seekerProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default SeekerProfileSettingsPage;
