/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    experimentalReact: true,
    appDir: true,
  },
}

export default nextConfig
