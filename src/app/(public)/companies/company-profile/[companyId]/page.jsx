import { getCompanyById } from "@/lib/api/public-api/companies";
import CompanyProfileHeader from "@/components/companies/profile/CompanyProfileHeader";
import CompanyProfileContent from "@/components/companies/profile/CompanyProfileContent";
import CompanyProfileSidebar from "@/components/companies/profile/CompanyProfileSidebar";
import CompanyNotFound from "@/components/companies/profile/CompanyNotFound";

import { constructMetadata } from "@/lib/metadata";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { companyId } = await params;
  const company = await getCompanyById(companyId).catch(() => null);

  if (!company) {
    return constructMetadata({
      title: "Company Not Found",
      description: "The requested company profile could not be found or has been removed.",
      noIndex: true,
    });
  }

  const title = `${company.name} — Careers & Profile`;
  const description =
    company.description?.slice(0, 160) ||
    `Discover career opportunities, company culture, open roles, and detailed information for ${company.name} on NextHire.`;

  return constructMetadata({
    title,
    description,
    canonical: `/companies/company-profile/${companyId}`,
    image: company.logoUrl || company.coverImage || "/images/og-image.png",
    keywords: [company.name, company.industry, "careers at " + company.name, "tech company profile"].filter(Boolean),
  });
}

const CompanyDetailsPage = async ({ params }) => {
  const { companyId } = await params;

  // Fetch single company profile data
  const companyData = await getCompanyById(companyId);

  // Handle empty / non-existent company profile state UI
  if (!companyData) {
    return <CompanyNotFound />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        {/* Hero Header Section */}
        <CompanyProfileHeader company={companyData} />

        {/* 2-Column Responsive Layout: Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Body (2 Columns on Desktop) */}
          <div className="lg:col-span-2">
            <CompanyProfileContent company={companyData} />
          </div>

          {/* Sticky Quick Details Sidebar (1 Column on Desktop) */}
          <div className="lg:col-span-1">
            <CompanyProfileSidebar company={companyData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyDetailsPage;