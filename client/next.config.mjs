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
  },

   // Enable SWC minification
   optimization: {
    minimize: true,
  },
  turbopack: {
    enabled: true,
  },
};

export default nextConfig;
