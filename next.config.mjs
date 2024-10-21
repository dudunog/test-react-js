/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["preview.redd.it", "external-preview.redd.it", "styles.redditmedia.com"]
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_REDDIT_REDIRECT_URI: process.env.NEXT_PUBLIC_REDDIT_REDIRECT_URI,
  },
  serverRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    APP_AUTH_URL: process.env.APP_AUTH_URL,
    REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_REDDIT_REDIRECT_URI:
			process.env.NEXT_PUBLIC_REDDIT_REDIRECT_URI,
  },
};

export default nextConfig;
