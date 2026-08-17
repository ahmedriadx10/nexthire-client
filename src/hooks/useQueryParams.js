"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * useQueryParams — URL-as-state hook for browse-jobs page.
 *
 * All filter / sort / search / pagination controls read from and write to the
 * URL search-params. This keeps the Server Component page in sync without any
 * useEffect-based state management.
 *
 * Returns helpers:
 *  - setParam(key, value)          set a single param and push (resets page to 1)
 *  - setMultiParam(key, values[])  set a repeated param e.g. jobType[] (resets page to 1)
 *  - removeParam(key)              delete a param and push (resets page to 1)
 *  - setPage(pageNumber)           update only the page param (no page reset)
 *  - searchParams                  read-only URLSearchParams for the current URL
 */
export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Build a new URL string by merging updates into current searchParams. */
  const buildUrl = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.delete(key);
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, String(value));
        }
      });

      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  /** Set a single scalar param. Also resets page to 1. */
  const setParam = useCallback(
    (key, value) => {
      router.push(buildUrl({ [key]: value, page: "1" }), { scroll: false });
    },
    [router, buildUrl]
  );

  /** Set a repeated param (e.g. jobType=full-time&jobType=contract). Resets page to 1. */
  const setMultiParam = useCallback(
    (key, values) => {
      router.push(buildUrl({ [key]: values, page: "1" }), { scroll: false });
    },
    [router, buildUrl]
  );

  /** Remove a param entirely. Resets page to 1. */
  const removeParam = useCallback(
    (key) => {
      router.push(buildUrl({ [key]: null, page: "1" }), { scroll: false });
    },
    [router, buildUrl]
  );

  /** Update only the page number without resetting other params. */
  const setPage = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { searchParams, setParam, setMultiParam, removeParam, setPage };
};
