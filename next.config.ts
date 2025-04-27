import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io", "lh3.googleusercontent.com"],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withFlowbiteReact(nextConfig));
