import type { NextConfig } from 'next';

import { createCivicAuthPlugin } from '@civic/auth-web3/nextjs';

const nextConfig: NextConfig = {
  // Ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};


const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID!,
  loginSuccessUrl: "/app",
  loginUrl: "/auth",
});

// export default nextConfig;
export default withCivicAuth(nextConfig);