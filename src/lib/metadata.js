export const SITE_CONFIG = {
  name: "NextHire",
  title: "NextHire | Modern Job Board & Recruitment Platform",
  description:
    "NextHire connects top talent with innovative companies. Discover curated job opportunities, post open roles, and streamline your hiring process.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://nexthire-production-zero.vercel.app",
  ogImage: "/images/nexthire.png",
  keywords: [
    "NextHire",
    "job board",
    "recruitment",
    "careers",
    "hiring platform",
    "tech jobs",
    "remote jobs",
    "employment",
    "software developer jobs",
  ],
  twitterHandle: "@nexthire",
};

/**
 * Constructs industry-standard Next.js App Router Metadata object.
 *
 * @param {Object} options
 * @param {string} [options.title] - Page specific title.
 * @param {string} [options.description] - Page specific description.
 * @param {string} [options.image] - Custom OG image URL or relative path.
 * @param {boolean} [options.noIndex=false] - Whether to set robots noindex/nofollow.
 * @param {string} [options.canonical] - Relative path for canonical link e.g. "/browse-jobs".
 * @param {Array<string>} [options.keywords=[]] - Additional page specific keywords.
 * @param {string} [options.type="website"] - OG type ("website", "article", etc.).
 * @returns {import('next').Metadata}
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  noIndex = false,
  canonical,
  keywords = [],
  type = "website",
} = {}) {
  const fullTitle = title
    ? title.includes("NextHire")
      ? title
      : `${title} | NextHire`
    : SITE_CONFIG.title;

  const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const canonicalUrl = canonical
    ? `${siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : siteUrl;

  const imageUrl = image.startsWith("http")
    ? image
    : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...SITE_CONFIG.keywords, ...keywords])),
    authors: [{ name: "NextHire Team" }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(siteUrl),
    ...(canonical && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              "max-video-preview": -1,
              "max-image-preview": "large",
              "max-snippet": -1,
            },
          },
        }),
  };
}
