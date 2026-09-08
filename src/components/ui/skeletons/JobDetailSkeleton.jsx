import { Skeleton } from "@heroui/react";

/**
 * JobDetailSkeleton — loading placeholder for /browse-jobs/details/[jobId].
 * Mirrors: hero header + two-column layout (description left, sidebar right).
 */
const JobDetailSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-8">
        {/* Header card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-5">
            <Skeleton className="rounded-2xl w-16 h-16 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="rounded-lg h-7 w-64" />
              <Skeleton className="rounded-md h-5 w-40" />
              <div className="flex gap-2 flex-wrap pt-1">
                <Skeleton className="rounded-full h-6 w-20" />
                <Skeleton className="rounded-full h-6 w-24" />
                <Skeleton className="rounded-full h-6 w-20" />
              </div>
            </div>
            <Skeleton className="rounded-xl h-10 w-28 shrink" />
          </div>
        </div>

        {/* Body: description + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="rounded-lg h-6 w-40" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className={`rounded-md h-4 ${i % 3 === 0 ? "w-3/4" : "w-full"}`} />
            ))}
            <Skeleton className="rounded-lg h-6 w-32 mt-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2 items-center">
                <Skeleton className="rounded w-3 h-3" />
                <Skeleton className="rounded-md h-4 w-56" />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="rounded-md h-4 w-24" />
                  <Skeleton className="rounded-md h-5 w-32" />
                </div>
              ))}
              <Skeleton className="rounded-xl h-11 w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetailSkeleton;
