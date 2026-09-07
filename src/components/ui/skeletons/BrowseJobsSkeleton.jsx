import { Skeleton } from "@heroui/react";

/**
 * BrowseJobsSkeleton — loading placeholder for /browse-jobs page.
 * Mirrors: search bar → filter sidebar (left) + job card list (right).
 */
const BrowseJobsSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Search bar */}
        <Skeleton className="rounded-xl h-12 w-full" />

        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Filter sidebar */}
          <div className="w-full md:w-52 shrink-0 space-y-4">
            <Skeleton className="rounded-lg h-6 w-24" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="rounded w-4 h-4" />
                <Skeleton className="rounded-md h-4 w-28" />
              </div>
            ))}
            <div className="pt-2 space-y-3">
              <Skeleton className="rounded-lg h-6 w-24" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="rounded w-4 h-4" />
                  <Skeleton className="rounded-md h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Job listings column */}
          <div className="w-full md:flex-1 min-w-0 space-y-4">
            {/* Listings header */}
            <div className="flex items-center justify-between">
              <Skeleton className="rounded-lg h-6 w-48" />
              <Skeleton className="rounded-lg h-9 w-32" />
            </div>

            {/* Job cards */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="rounded-xl w-12 h-12 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="rounded-md h-5 w-48" />
                    <Skeleton className="rounded-md h-4 w-32" />
                  </div>
                  <Skeleton className="rounded-lg h-8 w-20 shrink-0" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="rounded-full h-6 w-20" />
                  <Skeleton className="rounded-full h-6 w-24" />
                  <Skeleton className="rounded-full h-6 w-16" />
                </div>
                <Skeleton className="rounded-md h-4 w-36" />
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="rounded-lg w-9 h-9" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrowseJobsSkeleton;
