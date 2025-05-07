/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
      },
      compress: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
    optimizeCss: true,
    turbo: true,
  },
};

export default nextConfig;
