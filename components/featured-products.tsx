import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAllProducts } from "@/lib/shopify"
import { FeaturedProductsSkeleton } from "@/components/skeletons/featured-products-skeleton"
import { Suspense } from "react"

// Type definitions for Shopify products
interface ShopifyProduct {
  node: {
    id: string
    title: string
    handle: string
    description: string
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    images: {
      edges: Array<{
        node: {
          url: string
          altText: string
          width: number
          height: number
        }
      }>
    }
    variants: {
      edges: Array<{
        node: {
          id: string
          availableForSale: boolean
        }
      }>
    }
  }
}

async function FeaturedProductsContent() {
  // Add debug logging
  console.log("=== FEATURED PRODUCTS DEBUG ===")
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Store Domain:", process.env.SHOPIFY_STORE_DOMAIN)
  console.log("Access Token:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "SET" : "MISSING")

  // Fetch real products from Shopify
  const productsResponse = await getAllProducts()
  console.log("Products Response Status:", productsResponse.status)
  console.log("Products Response Error:", productsResponse.error)

  const products = productsResponse.body?.data?.products?.edges || []
  console.log("Products Found:", products.length)

  if (products.length > 0) {
    console.log("First Product:", products[0].node.title)
  }

  // If no products, show a message
  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Products</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              No products found. Please add some products to your Shopify store.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Take first 6 products for featured section
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Products</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product: ShopifyProduct) => {
            const { node } = product
            const price = Number.parseFloat(node.priceRange.minVariantPrice.amount)
            const currencyCode = node.priceRange.minVariantPrice.currencyCode
            const formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyCode,
            }).format(price)

            const image = node.images.edges[0]?.node
            const imageUrl = image?.url || "/placeholder.svg?height=400&width=400"
            const imageAlt = image?.altText || node.title

            const isAvailable = node.variants.edges[0]?.node.availableForSale

            return (
              <Card key={node.id} className="group cursor-pointer border-0 shadow-none">
                <Link href={`/products/${node.handle}`}>
                  <CardContent className="p-0">
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition-opacity">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700 font-medium">{node.title}</h3>
                        {!isAvailable && <p className="text-sm text-red-500 mt-1">Out of Stock</p>}
                      </div>
                      <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/collections/all">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <Suspense fallback={<FeaturedProductsSkeleton />}>
      <FeaturedProductsContent />
    </Suspense>
  )
}
