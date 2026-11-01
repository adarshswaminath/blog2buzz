import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old post URLs (before multi-source support) were dev.to-only.
      {
        source: "/details/:username/:slug",
        destination: "/posts/devto/:username/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
