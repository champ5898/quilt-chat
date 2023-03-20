/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [
      200, 300, 400, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig


