/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DB_LISTINGS: process.env.NOTION_DB_LISTINGS,
    NOTION_DB_LEADS: process.env.NOTION_DB_LEADS,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_URL: process.env.APP_URL,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV || "production",
    // GA_ID: process.env.GA_ID,
  },

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
}

export default nextConfig
