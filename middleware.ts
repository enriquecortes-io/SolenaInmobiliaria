import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Límites por tipo de endpoint — cada uno con su propio contador
const limiters: Record<string, Ratelimit> = {

 // Login — muy estricto, anti fuerza bruta
 auth: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(5, "1 m"),
   prefix: "rl:auth",
   analytics: false,
 }),

 // Drive/Image — costosos en CPU y quota, máx 30/min por IP
 heavy: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(30, "1 m"),
   prefix: "rl:heavy",
   analytics: false,
 }),

 // APIs públicas generales — máx 60/min por IP
 public: new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(60, "1 m"),
   prefix: "rl:public",
   analytics: false,
 }),
};

// Mapeo de rutas a limiters
function getLimiter(pathname: string): Ratelimit {
 if (pathname.startsWith("/api/admin/auth"))       return limiters.auth;
 if (pathname.startsWith("/api/drive"))             return limiters.heavy;
 if (pathname.startsWith("/api/image"))             return limiters.heavy;
 return limiters.public;
}

function getErrorMessage(pathname: string): string {
 if (pathname.startsWith("/api/admin/auth")) return "Demasiados intentos. Espera 1 minuto.";
 if (pathname.startsWith("/api/drive"))      return "Límite de requests alcanzado. Espera 1 minuto.";
 if (pathname.startsWith("/api/image"))      return "Límite de requests alcanzado. Espera 1 minuto.";
 return "Demasiadas solicitudes. Espera un momento.";
}

export const config = {
 matcher: [
   "/api/admin/auth",
   "/api/drive/:path*",
   "/api/image/:path*",
   "/api/properties",
   "/api/leads/:path*",
 ],
};

export async function middleware(req: NextRequest) {
 const ip =
   req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
   req.headers.get("x-real-ip") ??
   "anonymous";

 const { pathname } = req.nextUrl;
 const limiter = getLimiter(pathname);

 // Clave única por IP + ruta base para evitar compartir cuota entre endpoints
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
