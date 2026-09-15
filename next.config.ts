import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the built site can still be dragged into Netlify /
  // Cloudflare Pages for free, the same way the previous single-file build
  // was — see project notes. next/image's optimizer needs a running Node
  // server, which a static export doesn't have, so it's disabled here.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
