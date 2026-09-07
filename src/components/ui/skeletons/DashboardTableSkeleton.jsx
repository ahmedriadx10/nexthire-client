import { Skeleton } from "@heroui/react";

/**
 * DashboardTableSkeleton — loading placeholder for dashboard table/list sub-pages.
 * Used by: admin/companies, admin/jobs, admin/payments, admin/users,
 *          recruiter/jobs, recruiter/jobs/[id]/applicants,
 *          seeker/applications, seeker/saved.
 * Mirrors: page header + action button + data table rows.
 */
const DashboardTableSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="rounded-lg h-8 w-52" />
          <Skeleton className="rounded-md h-4 w-72" />
        </div>
        <Skeleton className="rounded-xl h-10 w-36" />
      </div>

      {/* Filters / search row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Skeleton className="rounded-xl h-10 flex-1 min-w-[200px] max-w-xs" />
        <Skeleton className="rounded-xl h-10 w-32" />
        <Skeleton className="rounded-xl h-10 w-32" />
      </div>

      {/* Table card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-zinc-800">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="rounded-md h-4 w-full" />
          ))}
        </div>

        {/* Table rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-zinc-800/50 last:border-0 items-center"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="rounded-xl w-9 h-9 shrink-0" />
              <Skeleton className="rounded-md h-4 w-24" />
            </div>
            <Skeleton className="rounded-md h-4 w-full" />
            <Skeleton className="rounded-md h-4 w-20" />
            <Skeleton className="rounded-full h-6 w-16" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="rounded-lg h-8 w-8" />
              <Skeleton className="rounded-lg h-8 w-8" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton className="rounded-md h-4 w-36" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="rounded-lg w-9 h-9" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTableSkeleton;
