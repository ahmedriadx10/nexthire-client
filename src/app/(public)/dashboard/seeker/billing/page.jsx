import SeekerBillingSkeleton from "@/components/dashboard/seeker-components/SeekerBillingSkeleton";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Billing & Plan | NextHire",
  description: "View your job seeker membership features, application quotas, and account status.",
  noIndex: true,
});

/**
 * SeekerBillingAndSubscriptionPage — Server Component
 *
 * Renders the membership plan status, application quota, and payment history dashboard
 * for job seeker accounts.
 */
const SeekerBillingAndSubscriptionPage = () => {
  return <SeekerBillingSkeleton />;
};

export default SeekerBillingAndSubscriptionPage;