"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";

/**
 * Builds the page number list with ellipsis for large page counts.
 * e.g. [1, 2, 3, '...', 42] or [1, '...', 5, 6, 7, '...', 42]
 */
const buildPages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1].filter(
    (p) => p >= 1 && p <= total
  ));

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }

  return result;
};

const btnBase =
  "flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium transition-colors duration-150 border";

const PageBtn = ({ onClick, disabled, active, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={[
      btnBase,
      active
        ? "bg-white text-zinc-900 border-white font-semibold"
        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed",
    ].join(" ")}
  >
    {children}
  </button>
);

/**
 * Pagination — client component.
 * Uses custom-built pagination to avoid HeroUI v3 compound API complexity.
 * Hidden when totalPages <= 1.
 */
const PaginationComponent = ({ currentPage = 1, totalPages = 0 }) => {
  const { setPage } = useQueryParams();

  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 mt-8"
    >
      {/* Previous */}
      <PageBtn
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={15} />
      </PageBtn>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex items-center justify-center w-9 h-9 text-zinc-600 text-sm"
          >
            <MoreHorizontal size={15} />
          </span>
        ) : (
          <PageBtn
            key={p}
            onClick={() => setPage(p)}
            active={p === currentPage}
          >
            {p}
          </PageBtn>
        )
      )}

      {/* Next */}
      <PageBtn
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight size={15} />
      </PageBtn>
    </nav>
  );
};

export default PaginationComponent;
