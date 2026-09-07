import { Skeleton } from "@heroui/react";

/**
 * HomepageLoadingSkeleton — loading placeholder for the (public) homepage.
 * Mirrors the hero section + feature highlights layout.
 */
function HomepageLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero section */}
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center space-y-6">
        <Skeleton className="rounded-full h-7 w-40" />
        <Skeleton className="rounded-xl h-14 w-3/4 mx-auto" />
        <Skeleton className="rounded-xl h-14 w-2/4 mx-auto" />
        <Skeleton className="rounded-lg h-6 w-96 mx-auto" />
        <Skeleton className="rounded-md h-5 w-80 mx-auto" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="rounded-xl h-12 w-36" />
          <Skeleton className="rounded-xl h-12 w-36" />
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="rounded-lg h-8 w-20 mx-auto" />
              <Skeleton className="rounded-md h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center space-y-3 mb-12">
          <Skeleton className="rounded-xl h-9 w-64 mx-auto" />
          <Skeleton className="rounded-md h-5 w-80 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4"
            >
              <Skeleton className="rounded-xl w-12 h-12" />
              <Skeleton className="rounded-lg h-6 w-40" />
              <Skeleton className="rounded-md h-4 w-full" />
              <Skeleton className="rounded-md h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  return <HomepageLoadingSkeleton />;
}
