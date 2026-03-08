import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/checkout", "/auth"],
    },
    sitemap: "https://trailer-ecommerce.vercel.app/sitemap.xml",
  };
}
