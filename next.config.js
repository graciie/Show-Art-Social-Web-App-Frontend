/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'api.lorem.space', 's.gravatar.com'],
  },
  async redirects() {
    return [
      {
        source: '/user/:username/posts',
        destination: '/user/:username',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: `${process.env.BACKEND_API}/assets/:path*`,
        }
      ]
    }
  }
};

module.exports = nextConfig;
