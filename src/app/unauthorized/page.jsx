import UnauthorizedView from "@/components/unauthorized/UnauthorizedView";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "401 — Unauthorized",
  description: "Please sign in to access your NextHire account or workspace.",
  noIndex: true,
});

export default function UnauthorizedPage() {
  return <UnauthorizedView />;
}