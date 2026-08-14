/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // The floating dev badge in the bottom-left corner. Dev-only, but it sits on
  // top of the player bar, so it is off.
  devIndicators: false,
};

export default nextConfig;
