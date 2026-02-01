import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "media-2.api-sports.io",
        port: "",
        pathname: "/football/**",
      },
    ],
  },
};

export default nextConfig;
