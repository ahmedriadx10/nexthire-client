import { Skeleton } from "@heroui/react";

/**
 * CompanyProfileSkeleton — loading placeholder for /companies/company-profile/[companyId].
 * Mirrors: cover image + company info header + about section + jobs list.
 */
const CompanyProfileSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white ">
      {/* Cover / banner */}
      {/* <Skeleton className="w-full bg-red-500 h-48 md:h-64 rounded-none" /> */}

      <div className="max-w-5xl mx-auto px-4 mt-20  space-y-8">
        {/* Company header card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-end gap-5">
            <Skeleton className="rounded-2xl w-24 h-24 shrink-0 -mt-12 border-4 border-zinc-900" />
            <div className="flex-1 space-y-2 pb-1">
              <Skeleton className="rounded-lg h-7 w-48" />
              <Skeleton className="rounded-md h-4 w-32" />
              <div className="flex gap-2 flex-wrap pt-1">
                <Skeleton className="rounded-full  h-6 w-20" />
                <Skeleton className="rounded-full h-6 w-20" />
              </div>
            </div>
            <Skeleton className="rounded-xl h-10 w-32 shrink" />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="rounded-md h-6 w-12 mx-auto" />
                <Skeleton className="rounded-md h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* About section */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <Skeleton className="rounded-lg h-6 w-24" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className={`rounded-md h-4 ${i === 4 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>

        {/* Open roles */}
        <div className="space-y-4">
          <Skeleton className="rounded-lg h-6 w-36" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <Skeleton className="rounded-md h-5 w-48" />
                <Skeleton className="rounded-md h-4 w-32" />
              </div>
              <Skeleton className="rounded-lg h-9 w-24 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CompanyProfileSkeleton;
