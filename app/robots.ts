import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*/admin", "/api/admin"],
      },
    ],
    sitemap: "https://mdlm-xi.vercel.app/sitemap.xml",
    host:    "https://mdlm-xi.vercel.app",
  };
}
