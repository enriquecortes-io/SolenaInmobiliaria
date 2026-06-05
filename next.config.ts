import type { NextConfig } from "next";

const securityHeaders = [
 // Anti-clickjacking: nadie puede meter tu web en un iframe
 {
   key: "X-Frame-Options",
   value: "DENY",
 },
 // Evita que el browser "adivine" el Content-Type (MIME sniffing)
 {
   key: "X-Content-Type-Options",
   value: "nosniff",
 },
 // Fuerza HTTPS durante 2 años, incluye subdomains
 {
   key: "Strict-Transport-Security",
   value: "max-age=63072000; includeSubDomains; preload",
 },
 // No envía el referrer a dominios externos
 {
   key: "Referrer-Policy",
   value: "strict-origin-when-cross-origin",
 },
 // Desactiva APIs sensibles del browser que no usas
 {
   key: "Permissions-Policy",
   value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
 },
 // CSP: controla desde dónde se pueden cargar recursos
 {
   key: "Content-Security-Policy",
   value: [
     "default-src 'self'",
     // Scripts: solo tu dominio + inline necesario para Next.js
     "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
     // Estilos: self + inline (Tailwind/GSAP los necesitan)
     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
     // Fuentes
     "font-src 'self' https://fonts.gstatic.com",
     // Imágenes: tu dominio + Google Drive + Supabase + data URIs
     "img-src 'self' data: blob: https://lh3.googleusercontent.com https://drive.google.com https://*.googleusercontent.com https://sqdvkfcghdjxtyuybxpy.supabase.co",
     // Conexiones fetch/XHR: Supabase + Google APIs
     "connect-src 'self' https://sqdvkfcghdjxtyuybxpy.supabase.co https://*.googleapis.com https://www.google-analytics.com",
     // Iframes: solo Google Maps
     "frame-src https://www.google.com/maps/",
     // Media (video/audio)
     "media-src 'self' blob: https://drive.google.com https://*.googleusercontent.com",
     // Bloquea objetos Flash etc.
     "object-src 'none'",
     // Base URL solo tu dominio
     "base-uri 'self'",
     // Formularios solo a tu dominio
     "form-action 'self'",
   ].join("; "),
 },
];

const nextConfig: NextConfig = {
 reactStrictMode: false,
 serverExternalPackages: ["next-intl"],

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

 async headers() {
   return [
     {
       // Aplica a todas las rutas
       source: "/(.*)",
       headers: securityHeaders,
     },
     {
       source: "/sitemap.xml",
       headers: [
         { key: "Content-Type", value: "application/xml; charset=utf-8" },
         { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
       ],
     },
     {
       source: "/robots.txt",
       headers: [
         { key: "Content-Type", value: "text/plain" },
       ],
     },
   ];
 },
};

export default nextConfig;
