# Browse Jobs — Component Architecture

## URL-as-State Pattern

All filter, sort, search, and pagination controls sync their state through
the **URL search-params** rather than React component state.

### Why URL-as-state?

| Concern | `useEffect` push approach | URL-as-state (this project) |
|---|---|---|
| Browser back/forward | ❌ State lost | ✅ Fully restored |
| Shareable links | ❌ State not in URL | ✅ Full state in URL |
| SSR data fetch | ❌ Extra round-trip | ✅ Server fetches once |
| Render cycles | ❌ state → effect → push | ✅ Single navigation |
| Complexity | Higher | Lower |

### How it works

```
User interacts with a filter/sort/search control
        ↓
Component calls setParam / setMultiParam / setPage
  (from useQueryParams hook)
        ↓
router.push('/browse-jobs?...newParams', { scroll: false })
        ↓
Next.js re-renders BrowseJobsPage (Server Component)
        ↓
page reads searchParams prop → calls getBrowseJobs()
        ↓
Fresh data rendered server-side
```

### useQueryParams API

```js
import { useQueryParams } from "@/hooks/useQueryParams";

const { searchParams, setParam, setMultiParam, removeParam, setPage } = useQueryParams();

// Set a single value (also resets page to 1)
setParam("sortBy", "salary-high");

// Set multiple values for a repeated key (also resets page to 1)
setMultiParam("jobType", ["full-time", "contract"]);

// Remove a param (also resets page to 1)
removeParam("search");

// Update page only
setPage(3);
```

## URL Schema

```
/browse-jobs
  ?search=frontend+developer
  &jobType=full-time
  &jobType=contract
  &sortBy=newest
  &postedWithin=l7d
  &page=2
```

## Component Tree

```
BrowseJobsPage (Server, async)  ← reads searchParams prop
├── <SearchBar />               (Client)
├── <FilterSidebar />           (Client)
├── <SortSelect />              (Client)
├── <JobList />                 (Server — receives jobs[] + permission)
│   └── <JobCard /> ×N         (Client — bookmark toggle)
└── <Pagination />              (Client)
```

## Adding New Filters

1. Add the new param key to the `URL Schema` above.
2. Create or extend a client component that calls `setParam` / `setMultiParam`.
3. Add the param to the `getBrowseJobs()` function body.
4. Update the Express backend handler to accept and apply it.
