/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["preview.redd.it", "external-preview.redd.it", "styles.redditmedia.com"]
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_REDDIT_REDIRECT_URI: process.env.NEXT_PUBLIC_REDDIT_REDIRECT_URI,
  }
};

export default nextConfig;
