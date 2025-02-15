/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['search.pstatic.net'],
  },
};

module.exports = nextConfig;
