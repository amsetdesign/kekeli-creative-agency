import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const PUBLIC_CLIENT_PATHS = [
  "/espace-client/login",
  "/espace-client/inscription",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

    // Check profile status using service role (bypasses RLS)
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
  matcher: ["/admin/:path*", "/espace-client/:path*"],
};
