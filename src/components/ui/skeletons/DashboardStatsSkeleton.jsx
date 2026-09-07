import { Skeleton } from "@heroui/react";

/**
 * DashboardStatsSkeleton — loading placeholder for dashboard home pages.
 * Used by /dashboard/admin, /dashboard/recruiter, and /dashboard/seeker.
 * Mirrors: page header → 4 stats cards → main content split layout.
 */
const DashboardStatsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="rounded-lg h-8 w-64" />
          <Skeleton className="rounded-md h-4 w-80" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="rounded-xl h-10 w-32" />
          <Skeleton className="rounded-xl h-10 w-32" />
        </div>
      </div>

      {/* Stats grid — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="rounded-md h-4 w-28" />
              <Skeleton className="rounded-xl w-9 h-9" />
            </div>
            <Skeleton className="rounded-lg h-8 w-20" />
            <Skeleton className="rounded-md h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Main content: two-column split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left column */}
        <div className="xl:col-span-8 space-y-6">
          {/* Chart or table block */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <Skeleton className="rounded-lg h-6 w-40" />
            <Skeleton className="rounded-xl h-48 w-full" />
          </div>

          {/* Second block */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <Skeleton className="rounded-lg h-6 w-36" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-2 border-b border-zinc-800 last:border-0"
              >
                <Skeleton className="rounded-xl w-10 h-10 shrink-0" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="rounded-md h-4 w-40" />
                  <Skeleton className="rounded-md h-3 w-24" />
                </div>
                <Skeleton className="rounded-full h-6 w-20 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full w-16 h-16 shrink-0" />
              <div className="space-y-2">
                <Skeleton className="rounded-md h-5 w-32" />
                <Skeleton className="rounded-md h-4 w-24" />
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="rounded-md h-3 w-20" />
                <Skeleton className="rounded-md h-4 w-36" />
              </div>
            ))}
            <Skeleton className="rounded-xl h-10 w-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsSkeleton;
