/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
      },
};

export default nextConfig;
