import { getCompanies } from "@/lib/api/public-api/companies";
import CompanyCard from "@/components/companies/CompanyCard";
import CompanySearch from "@/components/companies/CompanySearch";
import CompanyPagination from "@/components/companies/CompanyPagination";
import Link from "next/link";
import { RiBuilding4Line } from "react-icons/ri";

export const metadata = {
  title: "Browse Companies | NextHire",
  description:
    "Discover the world's leading technology and creative organizations. Filter by industry, size, and values to find your next professional home.",
};

const CompaniesPage = async ({ searchParams }) => {
  // Next.js 16: searchParams is a Promise — must be awaited
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const page = parseInt(resolvedSearchParams?.page || "1", 10);

  const { totalCompany, companyData } = await getCompanies(search, page);

  return (
    <main className="min-h-screen bg-zinc-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Browse Companies
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Discover the world's leading technology and creative organizations.
            Filter by industry, size, and values to find your next professional home.
          </p>
        </div>

        {/* Search Bar */}
        <div>
          <CompanySearch initialSearch={search} />
        </div>

        {/* Company Cards Grid or Empty State */}
        {companyData && companyData.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            <CompanyPagination
              currentPage={page}
              totalCompany={totalCompany}
              limit={6}
            />
          </div>
        ) : (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <RiBuilding4Line className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white">No Companies Found</h3>
            <p className="text-zinc-400 text-sm font-light">
              {search
                ? `We couldn't find any companies matching "${search}". Try searching with a different term.`
                : "No registered companies are available at the moment."}
            </p>
            {search && (
              <div className="pt-2">
                <Link
                  href="/companies"
                  className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-md"
                >
                  View All Companies
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CompaniesPage;