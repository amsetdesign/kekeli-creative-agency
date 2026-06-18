import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js injecte des scripts inline + Framer Motion utilise eval en dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com",
  "style-src 'self' 'unsafe-inline'",
  // Images locales + YouTube thumbnails + toutes origines HTTPS
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // Fetch/XHR : Supabase (REST + Realtime) + API Anthropic pour le chat
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com",
  // Embeds YouTube et Instagram
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.instagram.com",
  // Personne ne peut intégrer ce site dans une iframe
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 jours
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@supabase/supabase-js"],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
