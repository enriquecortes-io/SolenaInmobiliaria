import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src \'self\'",
      "script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'",
      "style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com",
      "font-src \'self\' https://fonts.gstatic.com",
      "img-src \'self\' data: blob: https://*.googleusercontent.com https://*.supabase.co https://lh3.googleusercontent.com",
      "media-src \'self\' blob:",
      "connect-src \'self\' https://*.supabase.co https://api.anthropic.com",
      "frame-src \'self\' https://www.google.com/maps/",
      "frame-ancestors \'none\'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ["next-intl"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 1080, 1920, 2560],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "sqdvkfcghdjxtyuybxpy.supabase.co" },
    ],
  },
};

export default nextConfig;
