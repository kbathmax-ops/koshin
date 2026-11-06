import path from "path";
import type { NextConfig } from "next";
import { REVOPS_HOST, REVOPS_URL } from "./lib/revops-host";

const onRevopsHost = [{ type: "host" as const, value: REVOPS_HOST }];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      // The story is the landing page — kbathmax.com goes straight to it.
      // Deliberately temporary: a permanent redirect gets cached hard by
      // browsers and is painful to undo while the site is still moving.
      {
        source: "/",
        missing: onRevopsHost,
        destination: "/story",
        permanent: false,
      },
      // RevOps has its own domain now. Temporary while that domain is a
      // vercel.app link; make it permanent once the real one is attached.
      {
        source: "/revops",
        missing: onRevopsHost,
        destination: REVOPS_URL,
        permanent: false,
      },
      // Case studies used to live at the top level; they now sit under /work.
      {
        source: "/case-studies",
        destination: "/work/case-studies",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/work/case-studies/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", has: onRevopsHost, destination: "/revops" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
