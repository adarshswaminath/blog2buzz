/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.dev.to',
            port: '',
            pathname: '/cdn-cgi/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**/**',
          },
          
        ],
      },
};

export default nextConfig;
