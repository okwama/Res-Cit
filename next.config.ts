import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if applicable
        hostname: 'ik.imagekit.io', // Your external image host
        port: '', // Leave empty if using the default port
        pathname: '/**', // Matches all paths
      },
    ],
  },
};

export default nextConfig;