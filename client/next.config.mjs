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
      domains: ['192.168.100.101', 'mmvsds-test.ddns.net', 's3.test.local', 'ads.test.local']
    }
};

export default nextConfig;
