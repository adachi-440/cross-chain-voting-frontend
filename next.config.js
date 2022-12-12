/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
            fs: false
        }
    }

    return config;
  },
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    POLYGON_TESTNET_API_KEY: process.env.POLYGON_TESTNET_API_KEY
  }
}

module.exports = nextConfig
