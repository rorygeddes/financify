/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export mode
  images: {
    unoptimized: true, // Fixes Next.js image issues in static mode
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;