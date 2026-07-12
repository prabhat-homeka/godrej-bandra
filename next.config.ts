import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=14400" },
        ],
      },
      {
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=14400" },
        ],
      },
    ];
  },
};

export default nextConfig;
