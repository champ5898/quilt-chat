/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "daulat-nft-marketplace.infura-ipfs.io",
      "infura-ipfs.io",
      "ipfs.io",
      "resolve.unstoppabledomains.com",
      "metadata.unstoppabledomains.com",
      "ipfs",
    ],
  },
};

module.exports = nextConfig;
