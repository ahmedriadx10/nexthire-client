import { FiBriefcase } from "react-icons/fi";
import JobCard from "./JobCard";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
      <FiBriefcase className="text-2xl text-zinc-600" />
    </div>
    <h3 className="text-base font-semibold text-zinc-300 mb-2">
      No jobs found
    </h3>
    <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
      Try adjusting your search keywords or clearing some filters to see more
      results.
    </p>
  </div>
);

/**
 * JobList — server component.
 * Receives pre-fetched jobs array and permission object from the page.
 * Maps over jobs and renders a JobCard for each.
 */
const JobList = ({ jobs = [], permission = { canSaveJob: false } ,user }) => {
  if (!jobs.length) return <EmptyState />;

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          canSaveJob={permission.canSaveJob}
          user={user}
          
        />
      ))}
    </div>
  );
};

export default JobList;
