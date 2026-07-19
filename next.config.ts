import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  serverExternalPackages: ["@supabase/supabase-js"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output = {
        ...config.output,
        chunkLoadTimeout: 120000,
      };
    }
    return config;
  },
};

export default nextConfig;
