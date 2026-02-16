import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Cho phép tất cả domain supabase
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Cho phép ảnh từ Unsplash
      },
    ],
  },
};

export default nextConfig;