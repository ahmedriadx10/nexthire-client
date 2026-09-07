import { Skeleton } from "@heroui/react";

/**
 * ApplyPageSkeleton — loading placeholder for /browse-jobs/details/[jobId]/apply.
 * Mirrors: job summary card + multi-step application form.
 */
const ApplyPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        {/* Job mini-header */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
          <Skeleton className="rounded-xl w-12 h-12 shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="rounded-md h-5 w-48" />
            <Skeleton className="rounded-md h-4 w-32" />
          </div>
        </div>

        {/* Form card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-7 space-y-6">
          <Skeleton className="rounded-lg h-6 w-40" />

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="rounded-md h-4 w-28" />
              <Skeleton className="rounded-xl h-11 w-full" />
            </div>
          ))}

          {/* Textarea */}
          <div className="space-y-2">
            <Skeleton className="rounded-md h-4 w-32" />
            <Skeleton className="rounded-xl h-28 w-full" />
          </div>

          {/* File upload */}
          <div className="space-y-2">
            <Skeleton className="rounded-md h-4 w-24" />
            <Skeleton className="rounded-xl h-20 w-full border-2 border-dashed border-zinc-700" />
          </div>

          {/* Submit */}
          <Skeleton className="rounded-xl h-11 w-full" />
        </div>
      </div>
    </main>
  );
};

export default ApplyPageSkeleton;
