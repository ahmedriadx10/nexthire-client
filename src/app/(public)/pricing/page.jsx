import PublicPricingSkeleton from "@/components/pricing/PublicPricingSkeleton";

import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Pricing Plans & Early Access",
  description:
    "Explore transparent pricing plans for recruiters and job seekers on NextHire. NextHire is currently 100% free during our early access phase.",
  canonical: "/pricing",
  keywords: ["recruiter pricing", "free job posting", "hiring plans", "early access recruitment"],
});

/**
 * PricingPage — Server Component
 *
 * Renders the public pricing and early access information dashboard.
 */
const PricingPage = () => {
  return <PublicPricingSkeleton />;
};

export default PricingPage;