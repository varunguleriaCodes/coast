/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.icons8.com"], // Allow Cloudinary's hostname
  },
};

export default nextConfig;
