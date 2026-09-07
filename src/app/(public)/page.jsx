

import HeroBanner from "@/components/homepage/HeroBanner";
import QuickBrowse from "@/components/homepage/QuickBrowse";
import FeaturedOpportunities from "@/components/homepage/FeaturedOpportunities";
import Features from "@/components/homepage/Features";
import TrustedBy from "@/components/homepage/TrustedBy";
import CTASection from "@/components/homepage/CTASection";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "NextHire | Discover Dream Jobs & Hire Top Technical Talent",
  description:
    "Explore thousands of curated job listings across engineering, design, and product. Connect top employers with tech professionals seamlessly.",
  canonical: "/",
  keywords: ["tech jobs", "find developer jobs", "hire engineers", "remote tech work", "career board"],
});

const NextHireHomePage = () => {
  return (
    <div className="bg-[#030303] text-white overflow-x-hidden min-h-screen selection:bg-primary/20 selection:text-white">
      <HeroBanner />
      <QuickBrowse />
      <FeaturedOpportunities />
      <Features />
      <TrustedBy />
      <CTASection />
    </div>
  );
};

export default NextHireHomePage;