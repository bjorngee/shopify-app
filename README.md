# Modern Shopify Storefront

A modern, headless Shopify storefront built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 🛍️ **Shopify Integration** via Storefront API
- 🎨 **Modern Design** with Tailwind CSS
- 📱 **Fully Responsive** design
- ⚡ **Performance Optimized** with caching
- 🔍 **SEO Friendly** with meta tags and sitemap
- 🔄 **Real-time Updates** via webhooks

## Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Shopify credentials
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_REVALIDATION_SECRET=your-secret
\`\`\`

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables
4. Deploy!

## Shopify Setup

1. Create a Shopify Partner account
2. Create a development store
3. Install the Shopify Headless app
4. Generate a Storefront API access token
5. Configure webhooks for real-time updates

## License

MIT License
