"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { Pagination } from "@heroui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const CompanyPagination = ({ currentPage = 1, totalCompany = 0, limit = 6 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(totalCompany / limit);

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Helper to build page numbers array with ellipsis for clean custom/HeroUI render
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center my-12">
      {/* If HeroUI Pagination subcomponents exist, we can render with standard sub-components, or clean UI buttons matching exact PNG mockup */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Previous Page"
        >
          <RiArrowLeftSLine className="text-xl" />
        </button>

        {/* Page Numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-10 flex items-center justify-center text-zinc-500 font-medium text-sm select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              disabled={isPending}
              className={`min-w-10 h-10 px-3 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer ${
                p === currentPage
                  ? "bg-white text-zinc-950 shadow-md scale-105"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Next Page"
        >
          <RiArrowRightSLine className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CompanyPagination;
