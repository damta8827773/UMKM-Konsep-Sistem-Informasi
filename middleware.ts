import { NextResponse, type NextRequest } from "next/server";

// Lightweight edge middleware. Firebase auth tokens live client-side, so the
// real /admin gate is the AdminGuard component + Firestore Rules. Here we just
// add a defensive header and keep a single place to extend later.
export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-DNS-Prefetch-Control", "off");
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
