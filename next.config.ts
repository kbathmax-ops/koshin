import path from "path";
import type { NextConfig } from "next";

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
        destination: "/story",
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
