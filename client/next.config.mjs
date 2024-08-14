const { NODE_ENV } = process.env;

const prod = NODE_ENV === "production";
const dev = NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    clientId: process.env.BACKEND_URL,
    clientSecret: process.env.BACKEND_URL,
    currency: process.env.BACKEND_URL,
    intent: process.env.BACKEND_URL
  },
  eslint:{
    ignoreDuringBuilds: true
  },
    images:{
      domains: 
    [
      '192.168.100.101', 
      'mmvsds-test.ddns.net',
      's3.test.local',
      'ads.test.local',
      'concertplatform.mmvs.video',
      'example.com',
      'dp-ent.com',
      '208.109.234.119'
    ]
    }
};

export default nextConfig;
