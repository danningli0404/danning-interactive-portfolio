import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  // Prefix the exported files after prerendering; render the local routes at root.
  basePath: '',
  images: { unoptimized: true },
};
export default nextConfig;
