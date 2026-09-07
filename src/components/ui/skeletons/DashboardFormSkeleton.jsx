import { Skeleton } from "@heroui/react";

/**
 * DashboardFormSkeleton — loading placeholder for dashboard form/settings sub-pages.
 * Used by: admin/settings, recruiter/settings, recruiter/billing, recruiter/company,
 *          recruiter/jobs/new, recruiter/jobs/[id]/edit,
 *          seeker/settings, seeker/billing.
 * Mirrors: page header + form sections with labeled input fields.
 */
const DashboardFormSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Page header */}
      <div className="mb-8 space-y-2">
        <Skeleton className="rounded-lg h-8 w-48" />
        <Skeleton className="rounded-md h-4 w-72" />
      </div>

      {/* Section 1 */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-7 space-y-6 mb-6">
        <div className="space-y-1">
          <Skeleton className="rounded-lg h-6 w-36" />
          <Skeleton className="rounded-md h-4 w-56" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="rounded-md h-4 w-24" />
              <Skeleton className="rounded-xl h-11 w-full" />
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <Skeleton className="rounded-md h-4 w-28" />
          <Skeleton className="rounded-xl h-28 w-full" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-7 space-y-6 mb-6">
        <div className="space-y-1">
          <Skeleton className="rounded-lg h-6 w-40" />
          <Skeleton className="rounded-md h-4 w-64" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="rounded-md h-4 w-20" />
              <Skeleton className="rounded-xl h-11 w-full" />
            </div>
          ))}
        </div>

        {/* Toggle / switch rows */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
            <div className="space-y-1">
              <Skeleton className="rounded-md h-4 w-40" />
              <Skeleton className="rounded-md h-3 w-56" />
            </div>
            <Skeleton className="rounded-full h-6 w-11 shrink-0" />
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="flex justify-end gap-3">
        <Skeleton className="rounded-xl h-11 w-24" />
        <Skeleton className="rounded-xl h-11 w-32" />
      </div>
    </div>
  );
};

export default DashboardFormSkeleton;
