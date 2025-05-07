/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
      },
      compress: true,
  experimental: {
    serverActions: true,
    optimizeCss: true,
  },

   // Enable SWC minification
  //  optimization: {
  //   minimize: true,
  // },

};

export default nextConfig;
