import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sintec",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
