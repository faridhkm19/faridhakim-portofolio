import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/skillset',
        destination: '/about#skillset',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/projects#testimonials',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
