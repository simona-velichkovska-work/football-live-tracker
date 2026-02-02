import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // configured in accordance with API Sports media documentation
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/football/**",
      },

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
