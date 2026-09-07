import { Skeleton } from "@heroui/react";

/**
 * CompaniesPageSkeleton — loading placeholder for /companies.
 * Mirrors: page header + search bar + 3-column company card grid.
 */
const CompaniesPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        {/* Page header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <Skeleton className="rounded-xl h-12 w-72 mx-auto" />
          <Skeleton className="rounded-lg h-5 w-96 mx-auto" />
          <Skeleton className="rounded-md h-4 w-80 mx-auto" />
        </div>

        {/* Search bar */}
        <Skeleton className="rounded-xl h-12 w-full max-w-xl mx-auto" />

        {/* Company cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="rounded-xl w-14 h-14 shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="rounded-md h-5 w-36" />
                  <Skeleton className="rounded-md h-4 w-24" />
                </div>
              </div>
              <Skeleton className="rounded-md h-4 w-full" />
              <Skeleton className="rounded-md h-4 w-3/4" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="rounded-full h-6 w-20" />
                <Skeleton className="rounded-full h-6 w-16" />
              </div>
              <Skeleton className="rounded-xl h-10 w-full mt-2" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="rounded-lg w-9 h-9" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CompaniesPageSkeleton;
