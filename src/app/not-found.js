import Link from "next/link";
import { FiSearch, FiHome, FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "404 – Page Not Found | NextHire",
  description: "The page you are looking for does not exist.",
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white font-sans overflow-x-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Navbar Brand Header */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white transition-all hover:opacity-90 select-none"
        >
          Next<span className="text-primary">Hire</span>
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
          404
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center my-auto">
        <div className="max-w-lg w-full space-y-8">

          {/* Large 404 Display */}
          <div className="relative select-none">
            <p className="text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-900">
              404
            </p>
            {/* Floating icon over the number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-xl flex items-center justify-center shadow-xl">
                <FiSearch className="text-primary text-2xl" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Page Not Found
            </span>
          </div>

          {/* Heading & Description */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Looks like you&apos;re lost
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-md mx-auto">
              The page you&apos;re looking for has been moved, deleted, or
              never existed. Double-check the URL, or head back to safety.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-zinc-950 font-bold text-sm transition-all active:scale-95"
            >
              <FiHome className="text-base" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/browse-jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition-all border border-zinc-800 active:scale-95"
            >
              <FiSearch className="text-base" />
              <span>Browse Jobs</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-xs mx-auto pt-2">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 font-mono shrink-0">or try these links</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Quick-nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Sign In", href: "/sign-in" },
              { label: "Sign Up", href: "/sign-up" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-zinc-500 hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-zinc-600 font-light">
        &copy; {new Date().getFullYear()} NextHire. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFoundPage;