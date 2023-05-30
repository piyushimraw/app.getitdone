/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"],
    typedRoutes: true,
  },
};

module.exports = nextConfig;
