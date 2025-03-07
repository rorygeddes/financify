/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export mode
  images: {
    unoptimized: true, // Fixes Next.js image issues in static mode
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ws: false, // Disables 'ws' module for client-side
      };
    }
    return config;
  },
};

module.exports = nextConfig;