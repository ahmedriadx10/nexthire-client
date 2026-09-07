import ForbiddenView from "@/components/forbidden/ForbiddenView";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "403 — Access Denied",
  description: "You do not have permission to access this resource or dashboard area.",
  noIndex: true,
});

export default function ForbiddenPage() {
  return <ForbiddenView />;
}