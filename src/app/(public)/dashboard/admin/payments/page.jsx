import AdminPaymentsSkeleton from "@/components/dashboard/admin-components/AdminPaymentsSkeleton";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Payments & Subscriptions | NextHire Admin",
  description: "View platform revenue logs, billing transactions, and recruiter subscription statuses.",
  noIndex: true,
});

/**
 * AdminPaymentAndSubscriptionsManagePage — Server Component
 *
 * Renders the platform payments & subscription management dashboard
 * for administrative users.
 */
const AdminPaymentAndSubscriptionsManagePage = () => {
  return <AdminPaymentsSkeleton />;
};

export default AdminPaymentAndSubscriptionsManagePage;