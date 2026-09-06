"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiHome, FiArrowLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";

const ErrorBoundary = ({ error, reset, unstable_retry }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Log error details for diagnostics
    console.error("NextHire App Error Caught:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else if (typeof reset === "function") {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#000000] text-white font-sans overflow-x-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar Brand Header */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="text-2xl font-black text-white transition-all hover:opacity-90 select-none"
        >
          Next<span className="text-primary">Hire</span>
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          System Exception
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center my-auto">
        <div className="max-w-xl w-full bg-[#0a0a0c]/80 border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Warning Graphic */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-red-950/50 border border-red-800/50 flex items-center justify-center text-red-400">
              <FiAlertTriangle className="text-3xl" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Unexpected Error
            </div>
          </div>

          {/* Heading & Description */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Something Went Wrong
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-md mx-auto">
              An unexpected error occurred while loading this page. You can try recovering by retrying your request.
            </p>
          </div>

          {/* Error Technical Details */}
          {error && (
            <div className="bg-[#141416]/70 border border-zinc-800/70 rounded-2xl p-4 text-left space-y-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-mono cursor-pointer"
              >
                <span>Technical Details {error?.digest && `(${error.digest})`}</span>
                {showDetails ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {showDetails && (
                <div className="pt-2 border-t border-zinc-800/80">
                  <p className="text-xs font-mono text-red-300/90 wrap-break-word bg-zinc-950/80 p-3 rounded-lg border border-zinc-900 leading-relaxed">
                    {error?.message || "An unexpected error occurred."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-zinc-950 font-bold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <FiRefreshCw className={`text-base ${isRetrying ? "animate-spin" : ""}`} />
              <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition-all border border-zinc-800 active:scale-95 cursor-pointer"
            >
              <FiArrowLeft className="text-base" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-semibold text-sm transition-all border border-zinc-700/60 active:scale-95"
            >
              <FiHome className="text-base" />
              <span>Home</span>
            </Link>
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

export default ErrorBoundary;