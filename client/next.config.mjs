/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
      },
    eslint:{
      ignoreDuringBuilds: true
    },
    images:{
      domains: ['http://mmvsds-test.ddns.net']
    }
};

export default nextConfig;
