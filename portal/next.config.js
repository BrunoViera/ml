/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "http2.mlstatic.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
