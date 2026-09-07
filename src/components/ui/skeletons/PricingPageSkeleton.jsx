import { Skeleton } from "@heroui/react";

/**
 * PricingPageSkeleton — loading placeholder for /pricing.
 * Mirrors: page header + 3 pricing tier cards.
 */
const PricingPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Skeleton className="rounded-xl h-12 w-64 mx-auto" />
          <Skeleton className="rounded-lg h-5 w-96 mx-auto" />
          <Skeleton className="rounded-md h-4 w-72 mx-auto" />
        </div>

        {/* Toggle monthly/annual */}
        <div className="flex justify-center">
          <Skeleton className="rounded-full h-10 w-48" />
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`bg-zinc-900/60 border rounded-2xl p-7 space-y-5 ${
                i === 2 ? "border-primary/40" : "border-zinc-800"
              }`}
            >
              {/* Plan name + badge */}
              <div className="space-y-2">
                <Skeleton className="rounded-md h-5 w-20" />
                {i === 2 && <Skeleton className="rounded-full h-5 w-16" />}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <Skeleton className="rounded-lg h-10 w-28" />
                <Skeleton className="rounded-md h-4 w-24" />
              </div>

              {/* Features */}
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="rounded-full w-4 h-4 shrink-0" />
                    <Skeleton className="rounded-md h-4 w-full" />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Skeleton className="rounded-xl h-11 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PricingPageSkeleton;
