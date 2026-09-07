import { SITE_CONFIG } from "@/lib/metadata";

export default async function sitemap() {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  const routes = ["", "/browse-jobs", "/companies", "/pricing"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
