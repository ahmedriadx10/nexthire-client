import RecruiterBillingSkeleton from "@/components/dashboard/recruiter-components/RecruiterBillingSkeleton";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Billing & Subscriptions | NextHire Recruiter",
  description: "Manage your employer subscription plan, view job posting quotas, and access billing invoices.",
  noIndex: true,
});

/**
 * RecruiterSubscriptionAndBillingPage — Server Component
 *
 * Renders the subscription, active plan quota, and billing history dashboard
 * for recruiter accounts.
 */
const RecruiterSubscriptionAndBillingPage = () => {
  return <RecruiterBillingSkeleton />;
};

export default RecruiterSubscriptionAndBillingPage;