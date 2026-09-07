import { Skeleton } from "@heroui/react";

/**
 * AuthPageSkeleton — loading placeholder for /login and /register pages.
 * Mirrors the centered card + form field layout used on auth pages.
 */
const AuthPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / brand */}
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="rounded-xl w-12 h-12" />
          <Skeleton className="rounded-lg h-7 w-36" />
          <Skeleton className="rounded-md h-4 w-56" />
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-7 space-y-5">
          {/* Input fields × 2 or 3 */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="rounded-md h-4 w-20" />
              <Skeleton className="rounded-xl h-11 w-full" />
            </div>
          ))}

          {/* Submit button */}
          <Skeleton className="rounded-xl h-11 w-full mt-2" />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-px flex-1" />
            <Skeleton className="rounded h-4 w-6" />
            <Skeleton className="h-px flex-1" />
          </div>

          {/* OAuth button */}
          <Skeleton className="rounded-xl h-11 w-full" />

          {/* Footer link */}
          <Skeleton className="rounded-md h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSkeleton;
