import PublicPricingSkeleton from "@/components/pricing/PublicPricingSkeleton";

export const metadata = {
  title: "Pricing & Early Access | NextHire",
  description:
    "NextHire is currently 100% free during our early access development phase for recruiters and job seekers.",
};

/**
 * PricingPage — Server Component
 *
 * Renders the public pricing and early access information dashboard.
 */
const PricingPage = () => {
  return <PublicPricingSkeleton />;
};

export default PricingPage;