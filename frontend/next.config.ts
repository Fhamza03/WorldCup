import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.SERVER_BACKEND_URL}/:path*`,
      },
    ];
  },

  env: {
    API_BASE_URL: process.env.SERVER_BACKEND_URL,
  },
};

export default nextConfig;
