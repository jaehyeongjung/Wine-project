/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'search.pstatic.net',
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
