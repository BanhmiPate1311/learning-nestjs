/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'cdn.iconscout.com', 'placehold.co'],
  },
};

module.exports = nextConfig;
