/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env : {
    NEXT_PUBLIC_API_KEY: process.env.apiKey,
    NEXT_PUBLIC_AUTH_DOMAIN: process.env.authDomain,
    NEXT_PUBLIC_PROJECT_ID: process.env.projectId,
    NEXT_PUBLIC_STORAGE_BUCKET: process.env.storageBucket,
    NEXT_PUBLIC_MESSAGING_SENDER_ID: process.env.messagingSenderId,
    NEXT_PUBLIC_APP_ID: process.env.appId,
  }
}

nextConfig