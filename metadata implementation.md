# Next.js App Router Industry-Standard Metadata Implementation Guide

> **Author / Educator Note:** This document serves as a comprehensive teaching resource and reference guide for understanding how industry-standard SEO and social media metadata are architected and implemented in modern Next.js (v13 – v16+) App Router applications.

---

## Table of Contents
1. [Overview & Core Purpose](#1-overview--core-purpose)
2. [Architecture & Key Components Used](#2-architecture--key-components-used)
3. [Core Technical Concepts Explained](#3-core-technical-concepts-explained)
   - [A. Central Metadata Builder (`constructMetadata`)](#a-central-metadata-builder-constructmetadata)
   - [B. Static Metadata Export (`export const metadata`)](#b-static-metadata-export-export-const-metadata)
   - [C. Dynamic Metadata Export (`export async function generateMetadata`)](#c-dynamic-metadata-export-export-async-function-generatemetadata)
   - [D. Server vs Client Component Separation](#d-server-vs-client-component-separation)
   - [E. Dynamic Sitemap & Robots Control](#e-dynamic-sitemap--robots-control)
4. [Public vs. Protected Route Indexing Strategy](#4-public-vs-protected-route-indexing-strategy)
5. [How to Add Metadata to New Pages (Developer Cheatsheet)](#5-how-to-add-metadata-to-new-pages-developer-cheatsheet)
6. [Best Practices Summary](#6-best-practices-summary)

---

## 1. Overview & Core Purpose

### What is Metadata?
Metadata consists of elements inside the HTML `<head>` tag that describe a webpage to **search engines** (Google, Bing), **social media crawlers** (LinkedIn, Twitter, Facebook, Slack, WhatsApp), and **web browsers**.

### Why is Metadata Essential?
1. **Search Engine Optimization (SEO):** Helps Google index and understand the relevance of your pages, improving rankings.
2. **Social Media Link Previews:** Renders rich visual preview cards (image, headline, description) when links are shared on platforms like LinkedIn, Twitter, or Discord.
3. **Canonicalization:** Prevents penalty for duplicate content across different URLs.
4. **User Experience (UX):** Sets clean, identifiable browser tab titles and tab icons.
5. **Privacy & Security:** Instructs search engines **not to index** private dashboard pages or user-specific data (`noindex, nofollow`).

---

## 2. Architecture & Key Components Used

In NextHire, metadata is structured cleanly using a centralized builder pattern:

```
src/
├── lib/
│   └── metadata.js               <-- Central Helper & Base Config
├── app/
│   ├── layout.jsx                <-- Root Metadata Defaults & Title Template
│   ├── robots.js                 <-- Dynamic Search Engine Crawler Rules
│   ├── sitemap.js                <-- Dynamic Sitemap Generator for Public Routes
│   ├── (public)/                 <-- Public Pages (Indexable with OG & Twitter)
│   ├── (auth)/                   <-- Auth Pages (noIndex: true)
│   ├── forbidden/ & unauthorized/<-- Error Pages (Refactored to Server Components + Client Views)
│   └── (public)/dashboard/       <-- Admin, Recruiter, & Seeker Dashboards (noIndex: true)
```

---

## 3. Core Technical Concepts Explained

### A. Central Metadata Builder (`constructMetadata`)

**Location:** `src/lib/metadata.js`

#### What is it?
Instead of duplicating title, description, OpenGraph, Twitter, and canonical structures in every single page, `constructMetadata()` is a reusable utility function that accepts page-specific parameters and returns a complete, valid Next.js `Metadata` object.

#### Why use it?
- **DRY (Don't Repeat Yourself):** Avoids writing 30+ lines of OpenGraph and Twitter boilerplate per page.
- **Consistency:** Ensures site name (`NextHire`), default fallback images, locale (`en_US`), and site URLs are consistent across the entire app.
- **Maintainability:** Updating your site's default OG image or Twitter handle requires changing only one file (`src/lib/metadata.js`).

#### Code Implementation:
```javascript
import { constructMetadata } from "@/lib/metadata";

// Example Usage in a static page
export const metadata = constructMetadata({
  title: "Browse Jobs & Career Opportunities",
  description: "Explore thousands of tech job listings.",
  canonical: "/browse-jobs",
  keywords: ["tech jobs", "remote developer roles"],
});
```

---

### B. Static Metadata Export (`export const metadata`)

#### When to use?
Use static metadata on pages whose title and description are fixed and do not depend on dynamic database items (e.g., Home Page, Browse Jobs, Pricing, Login, Settings).

#### Code Example (`src/app/(public)/pricing/page.jsx`):
```javascript
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Pricing Plans & Early Access",
  description: "Explore transparent pricing plans for recruiters and job seekers on NextHire.",
  canonical: "/pricing",
});

export default function PricingPage() {
  return <PublicPricingSkeleton />;
}
```

---

### C. Dynamic Metadata Export (`export async function generateMetadata`)

#### When to use?
Use `generateMetadata()` on dynamic route pages like `/browse-jobs/details/[jobId]` or `/companies/company-profile/[companyId]`, where the title and OpenGraph image depend on database data fetched at runtime.

#### Key Next.js 15/16 Requirement:
In modern Next.js App Router, route `params` and `searchParams` are **Promises** and must be `await`ed before accessing their properties.

#### Code Example (`src/app/(public)/browse-jobs/details/[jobId]/page.jsx`):
```javascript
import { getJobDetails } from "@/lib/api/public-api/jobs";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  // 1. Await dynamic route params
  const { jobId } = await params;

  // 2. Fetch resource data
  const job = await getJobDetails(jobId).catch(() => null);

  if (!job) {
    return constructMetadata({
      title: "Job Listing Not Found",
      noIndex: true,
    });
  }

  // 3. Return dynamic metadata object
  return constructMetadata({
    title: `${job.title} at ${job.company?.name || "Company"}`,
    description: job.description?.slice(0, 160) || `Apply for ${job.title} on NextHire.`,
    canonical: `/browse-jobs/details/${jobId}`,
    image: job.company?.logoUrl || "/images/og-image.png",
  });
}
```

---

### D. Server vs Client Component Separation

#### Critical Next.js Rule:
In Next.js App Router, `export const metadata` or `export async function generateMetadata` **CAN ONLY BE EXPORTED FROM SERVER COMPONENTS**. If a file contains `"use client"`, exporting metadata will throw a Next.js build error.

#### How We Solved This (`src/app/unauthorized/page.jsx` & `src/app/forbidden/page.jsx`):
When a page requires client interactivity (such as `useRouter().back()`), we separate the component into two files:
1. **`View Component` (`src/components/unauthorized/UnauthorizedView.jsx`):** Marked with `"use client"`, handles UI and interactivity.
2. **`Page Component` (`src/app/unauthorized/page.jsx`):** Server Component, exports `metadata`, and renders `<UnauthorizedView />`.

```
Page (Server Component)  --->  Exports metadata
    └── Renders View (Client Component)  --->  Handles onClick / useRouter()
```

---

### E. Dynamic Sitemap & Robots Control

1. **`src/app/robots.js`:** Tells search engine bots which routes they are allowed to crawl.
   - `Allow: /` (Public marketing and job board routes)
   - `Disallow: /dashboard/`, `Disallow: /api/` (Protects private dashboards and internal API endpoints)

2. **`src/app/sitemap.js`:** Dynamically generates an XML sitemap of all public URLs (`/`, `/browse-jobs`, `/companies`, `/pricing`) so Google Search Console can discover pages efficiently.

---

## 4. Public vs. Protected Route Indexing Strategy

| Route Type | Examples | Indexing Setting | Reason |
| :--- | :--- | :--- | :--- |
| **Public Landing & Marketing** | `/`, `/browse-jobs`, `/companies`, `/pricing` | `index: true, follow: true` | Target search engine indexing to acquire organic traffic. |
| **Dynamic Public Profiles** | `/browse-jobs/details/[jobId]`, `/companies/company-profile/[companyId]` | `index: true, follow: true` | Renders job posts and company profiles on Google search results. |
| **Auth Pages** | `/login`, `/register` | `noIndex: true` (`noindex, follow`) | Keeps authentication forms out of Google search results. |
| **Protected Dashboard Pages** | `/dashboard/admin/*`, `/dashboard/recruiter/*`, `/dashboard/seeker/*` | `noIndex: true` (`noindex, nofollow`) | Protects user privacy and administrative security. |
| **Application Forms** | `/browse-jobs/details/[jobId]/apply` | `noIndex: true` (`noindex, nofollow`) | Prevents search engines from indexing candidate application forms. |

---

## 5. How to Add Metadata to New Pages (Developer Cheatsheet)

### Adding Metadata to a Static Page:
```javascript
// app/new-feature/page.jsx
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "New Feature Name",
  description: "Description of the new feature.",
  canonical: "/new-feature",
});

export default function NewFeaturePage() {
  return <div>Content</div>;
}
```

### Adding Metadata to a Protected Page:
```javascript
// app/(public)/dashboard/recruiter/analytics/page.jsx
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Recruiter Analytics | NextHire",
  description: "Analytics and response performance for recruiter listings.",
  noIndex: true, // Prevents search engines from indexing
});

export default function AnalyticsPage() {
  return <div>Dashboard Content</div>;
}
```

---

## 6. Best Practices Summary

1. **Title Length:** Keep titles between **50 – 60 characters** to prevent truncation on Google search results.
2. **Description Length:** Keep descriptions between **150 – 160 characters**.
3. **OpenGraph Image Dimensions:** Standard size is **1200 x 630 pixels** (1.91:1 ratio) for high resolution preview cards across all social networks.
4. **Canonical URLs:** Always pass relative canonical paths (`/browse-jobs`) to avoid duplicate content penalties.
5. **Protected Content Safety:** Always mark internal user pages (`/dashboard/*`, `/settings/*`, `/apply/*`) with `noIndex: true`.
