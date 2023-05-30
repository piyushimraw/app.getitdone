/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"],
    typedRoutes: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
