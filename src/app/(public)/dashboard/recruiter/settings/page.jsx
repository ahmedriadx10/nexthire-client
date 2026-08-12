import { getRecruiterWithProfile } from "@/lib/api/RecruiterProfile";
import RecruiterAccountCard from "@/components/dashboard/recruiter-components/RecruiterAccountCard";
import RecruiterProfileCard from "@/components/dashboard/recruiter-components/RecruiterProfileCard";

export const metadata = {
  title: "Profile Settings | NextHire Recruiter",
  description:
    "Manage your recruiter profile — update your headline, bio, contact details, social links, and cover banner.",
};

const RecruiterProfileSettingsPage = async () => {
  const { recruiterData, recruiterProfile } = await getRecruiterWithProfile();



  return (
    <div className="max-w-6xl mx-auto pb-12 select-none">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
          Profile Settings
        </h1>
        <p className="text-sm text-zinc-500 font-light mt-1.5">
          Keep your profile up-to-date so candidates know who they&apos;re connecting with.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Account Info (read-only) */}
        <div className="xl:col-span-4">
          <RecruiterAccountCard recruiterData={recruiterData} />
        </div>

        {/* Right: Profile Details (editable) */}
        <div className="xl:col-span-8">
          <RecruiterProfileCard
            recruiterId={recruiterData?.id}
            recruiterProfile={recruiterProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfileSettingsPage;
