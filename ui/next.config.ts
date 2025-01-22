import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // ✅ Ensures Render deploys correctly
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ✅ Ensure compatibility for Next.js 15
  },
};

export default nextConfig;
