import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

/* ── Rate limiting (in-memory, par IP) ─────────────────────────────
   Fenêtre glissante de 60 secondes. Suffisant pour bloquer les bots
   sur un site à trafic modéré sans dépendance externe (pas de Redis).
   ----------------------------------------------------------------- */
const store = new Map<string, { count: number; reset: number }>();

const LIMITS: Record<string, number> = {
  "/api/admin/login":           5,
  "/api/admin/verify-otp":     10,
  "/api/newsletter/subscribe":  3,
  "/api/contact":              10,
  "/api/brief":                10,
  "/api/sondage":              10,
  "/api/chat":                 20,
  default:                     30,
};

function getRateLimit(pathname: string): number {
  for (const [route, limit] of Object.entries(LIMITS)) {
    if (route !== "default" && pathname.startsWith(route)) return limit;
  }
  return LIMITS.default;
}

function isRateLimited(ip: string, pathname: string): boolean {
  const limit = getRateLimit(pathname);
  const key   = `${ip}|${pathname}`;
  const now   = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

let lastClean = Date.now();
function maybeClean() {
  if (Date.now() - lastClean < 5 * 60_000) return;
  const now = Date.now();
  for (const [key, val] of store) {
    if (now > val.reset) store.delete(key);
  }
  lastClean = Date.now();
}

// ── Public paths (espace-client) ──────────────────────────────────
const PUBLIC_CLIENT_PATHS = [
  "/espace-client/login",
  "/espace-client/inscription",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rate limiting sur toutes les routes API ──────────────────
  if (pathname.startsWith("/api/")) {
    maybeClean();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip, pathname)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    return NextResponse.next();
  }

  // ── Admin protection (cookie-based) ──────────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("kekeli_admin")?.value;
    if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Client portal protection (Supabase Auth) ─────────────────
  if (
    pathname.startsWith("/espace-client") &&
    !PUBLIC_CLIENT_PATHS.some((p) => pathname.startsWith(p))
  ) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/espace-client/login", request.url));
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    const { data: profile } = await admin
      .from("client_profiles")
      .select("status")
      .eq("id", user.id)
      .single();

    if (!profile || profile.status === "pending") {
      return NextResponse.redirect(
        new URL("/espace-client/login?status=pending", request.url),
      );
    }
    if (profile.status === "suspended") {
      return NextResponse.redirect(
        new URL("/espace-client/login?status=suspended", request.url),
      );
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/espace-client/:path*", "/api/:path*"],
};
