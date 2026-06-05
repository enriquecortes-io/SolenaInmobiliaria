import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ============================================
// RATE LIMITING
// ============================================
const redis = Redis.fromEnv();

const limiters: Record<string, Ratelimit> = {
 auth: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(5, "1 m"),
   prefix: "rl:auth",
   analytics: false,
 }),
 heavy: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(30, "1 m"),
   prefix: "rl:heavy",
   analytics: false,
 }),
 public: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(60, "1 m"),
   prefix: "rl:public",
   analytics: false,
 }),
};

function getLimiter(pathname: string): Ratelimit {
 if (pathname.startsWith("/api/admin/auth")) return limiters.auth;
 if (pathname.startsWith("/api/drive"))      return limiters.heavy;
 if (pathname.startsWith("/api/image"))      return limiters.heavy;
 return limiters.public;
}

function getErrorMessage(pathname: string): string {
 if (pathname.startsWith("/api/admin/auth")) return "Demasiados intentos. Espera 1 minuto.";
 return "Límite de requests alcanzado. Espera 1 minuto.";
}

// ============================================
// GEO-REDIRECT por país
// Vercel inyecta el header x-vercel-ip-country automáticamente
// Con Cloudflare (cuando tengas dominio) será CF-IPCountry
// ============================================
const GEO_LOCALE: Record<string, string> = {
 // Inglés
 GB: "en", US: "en", AU: "en", CA: "en", IE: "en", NZ: "en",
 ZA: "en", SG: "en", AE: "en", QA: "en", KW: "en", BH: "en",
 // Ruso
 RU: "ru", UA: "ru", BY: "ru", KZ: "ru", UZ: "ru", AZ: "ru",
 // Francés
 FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr", SN: "fr",
 // Español (default también)
 ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
};

const locales = ["en", "es", "fr", "ru"];
const defaultLocale = "en"; // internacional → inglés por defecto

function detectLocale(req: NextRequest): string {
 // 1. Respetar preferencia guardada en cookie
 const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
 if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

 // 2. Geo-redirect por país (Vercel header)
 const country =
   req.headers.get("x-vercel-ip-country") ??
   req.headers.get("CF-IPCountry") ??     // Cloudflare (con dominio propio)
   "";
 const geoLocale = GEO_LOCALE[country.toUpperCase()];
 if (geoLocale) return geoLocale;

 // 3. Accept-Language del browser como fallback
 const acceptLang = req.headers.get("accept-language") || "";
 for (const locale of locales) {
   if (acceptLang.toLowerCase().includes(locale)) return locale;
 }

 // 4. Default internacional
 return defaultLocale;
}

function handleLocale(request: NextRequest): NextResponse | null {
 const { pathname } = request.nextUrl;

 const pathnameHasLocale = locales.some(
   (locale) => pathname.startsWith("/" + locale + "/") || pathname === "/" + locale
 );

 // Ya tiene locale — no redirigir
 if (pathnameHasLocale) return null;

 const locale = detectLocale(request);
 const url = request.nextUrl.clone();
 url.pathname = "/" + locale + pathname;

 const res = NextResponse.redirect(url);

 // Guardar en cookie para que la próxima visita mantenga el locale
 // Sin sobreescribir si el usuario lo cambió manualmente
 if (!request.cookies.get("NEXT_LOCALE")) {
   res.cookies.set("NEXT_LOCALE", locale, {
     maxAge: 60 * 60 * 24 * 365, // 1 año
     path: "/",
     sameSite: "lax",
   });
 }

 return res;
}

// ============================================
// MATCHER
// ============================================
export const config = {
 matcher: [
   "/api/admin/auth",
   "/api/drive/:path*",
   "/api/image/:path*",
   "/api/properties",
   "/api/leads/:path*",
   "/((?!api|_next/static|_next/image|favicon\\.ico|videos|gallery|fonts|[^/]+\\.[^/]+$).*)",
 ],
};

export async function middleware(req: NextRequest) {
 const { pathname } = req.nextUrl;

 // 1. Rutas API — rate limiting
 if (pathname.startsWith("/api/")) {
   const ip =
     req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
     req.headers.get("x-real-ip") ??
     "anonymous";

   const limiter = getLimiter(pathname);
   const key = `${ip}:${pathname.split("/")[2] ?? "root"}`;
   const { success, limit, remaining, reset } = await limiter.limit(key);

   if (!success) {
     return NextResponse.json(
       { error: getErrorMessage(pathname) },
       {
         status: 429,
         headers: {
           "X-RateLimit-Limit":     String(limit),
           "X-RateLimit-Remaining": "0",
           "X-RateLimit-Reset":     String(reset),
           "Retry-After":           "60",
         },
       }
     );
   }

   const res = NextResponse.next();
   res.headers.set("X-RateLimit-Limit",     String(limit));
   res.headers.set("X-RateLimit-Remaining", String(remaining));
   return res;
 }

 // 2. Rutas de página — geo-redirect + locale
 const localeRedirect = handleLocale(req);
 if (localeRedirect) return localeRedirect;

 return NextResponse.next();
}
