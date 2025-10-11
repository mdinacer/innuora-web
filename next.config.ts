import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  /* config options here */
  async redirects() {
    return [
      {
        source: "/testers",
        destination: "https://forms.gle/QR8KQiXuo6oT77KG7",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
