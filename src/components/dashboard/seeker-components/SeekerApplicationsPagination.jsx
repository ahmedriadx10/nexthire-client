"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";

/**
 * SeekerApplicationsPagination Component
 * Controls pagination for Seeker Applications page.
 *
 * @param {Object} props
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total pages count.
 */
const SeekerApplicationsPagination = ({ currentPage = 1, totalPages = 1 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <Pagination className="flex items-center justify-center py-4">
      <Pagination.Content className="flex items-center gap-1">
        {/* Previous */}
        <Pagination.Item>
          <Pagination.Previous
            onClick={() => goToPage(currentPage - 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === 1
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <Pagination.Item key={`ellipsis-${idx}`}>
              <Pagination.Ellipsis className="text-zinc-600 px-2 text-sm" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onClick={() => goToPage(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  p === currentPage
                    ? "bg-primary text-zinc-950 shadow-md shadow-primary/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        {/* Next */}
        <Pagination.Item>
          <Pagination.Next
            onClick={() => goToPage(currentPage + 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentPage === totalPages
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
            }`}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
};

export default SeekerApplicationsPagination;
