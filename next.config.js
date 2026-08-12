/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/your-repo-name",
  images: { unoptimized: true },
};

module.exports = nextConfig;