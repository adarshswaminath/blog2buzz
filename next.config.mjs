/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.dev.to',
            port: '',
            pathname: '/cdn-cgi/**',
          }
        ],
      },
};

export default nextConfig;
