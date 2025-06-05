import type { MetadataRoute } from "next"
import { getAllProducts } from "@/lib/shopify"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  // Get all products for sitemap
  const productsResponse = await getAllProducts()
  const products = productsResponse.body?.data?.products?.edges || []

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.node.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/collections/all`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productUrls,
  ]
}
