import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /<repo>/; el build de deploy pasa
// NEXT_PUBLIC_BASE_PATH=/mrelote. Local y Netlify lo dejan vacío.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export so the built site can still be dragged into Netlify /
  // Cloudflare Pages for free, the same way the previous single-file build
  // was — see project notes. next/image's optimizer needs a running Node
  // server, which a static export doesn't have, so it's disabled here.
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
