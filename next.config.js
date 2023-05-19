/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3.piton.com.tr"],
  },
};

module.exports = nextConfig;
