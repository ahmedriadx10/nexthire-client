"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShield, FiArrowLeft, FiHome, FiUserCheck, FiLock } from "react-icons/fi";

const ForbiddenView = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white font-sans overflow-x-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar Brand Link */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary transition-all hover:opacity-90">
          NextHire
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          HTTP 403
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center my-auto">
        <div className="max-w-2xl w-full bg-[#0a0a0c]/80 border border-zinc-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl space-y-8">
          
          {/* Badge & Graphic */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-b from-red-950/80 to-zinc-900 border border-red-800/50 flex items-center justify-center text-red-400 shadow-inner shadow-red-500/10">
                <FiShield className="text-4xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-red-600 border-2 border-black flex items-center justify-center text-white text-xs shadow-md">
                <FiLock />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Access Denied
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              403 — Forbidden
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto">
              You don&apos;t have permission to access this resource. Your account role may not have the required privileges for this page.
            </p>
          </div>

          {/* Context Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            <div className="bg-[#141416]/60 border border-zinc-800/70 rounded-2xl p-4 hover:border-zinc-700/80 transition-all">
              <span className="text-[11px] font-semibold text-red-400 tracking-wider uppercase block mb-1">
                Role Limitation
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                This destination requires specific recruiter, seeker, or admin permissions.
              </p>
            </div>
            <div className="bg-[#141416]/60 border border-zinc-800/70 rounded-2xl p-4 hover:border-zinc-700/80 transition-all">
              <span className="text-[11px] font-semibold text-primary tracking-wider uppercase block mb-1">
                Account Switch
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Need access? Log in with an account that has authorization for this area.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition-all border border-zinc-800 active:scale-95 cursor-pointer"
            >
              <FiArrowLeft className="text-base" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm transition-all shadow-lg hover:shadow-white/10 active:scale-95"
            >
              <FiHome className="text-base" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold text-sm transition-all border border-red-500/30 active:scale-95"
            >
              <FiUserCheck className="text-base" />
              <span>Switch Account</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} NextHire. All rights reserved.
      </footer>
    </div>
  );
};

export default ForbiddenView;
