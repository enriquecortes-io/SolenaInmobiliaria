import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es", "fr", "ru"];
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    const origin = request.headers.get("origin") || "";
    const host = request.headers.get("host") || "";
    const referer = request.headers.get("referer") || "";

    const isInternal =
      origin === "" ||
      origin.includes(host) ||
      referer.includes(host);

    if (!isInternal) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith("/" + locale + "/") || pathname === "/" + locale
  );

  if (pathnameHasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/" + defaultLocale + pathname;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\.ico|videos|gallery|fonts|[^/]+\.[^/]+$).*)"],
};
