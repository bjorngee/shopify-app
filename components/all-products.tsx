import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllProducts } from "@/lib/shopify"
import { ProductGridSkeleton } from "@/components/skeletons/product-card-skeleton"
import { Suspense } from "react"

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

async function AllProductsContent() {
  // Add debug logging
  console.log("=== ALL PRODUCTS DEBUG ===")

  // Fetch all products from Shopify
  const productsResponse = await getAllProducts()
  console.log("All Products Response:", productsResponse.status)
  console.log("All Products Error:", productsResponse.error)

  const products = productsResponse.body?.data?.products?.edges || []
  console.log("All Products Count:", products.length)

  // If no products, show a message
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 mb-8">
          It looks like there are no products in your store yet. Add some products in your Shopify admin to get started.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
          <h4 className="font-medium text-gray-900 mb-2">Getting Started:</h4>
          <ol className="text-sm text-gray-600 space-y-1 text-left">
            <li>1. Log into your Shopify admin</li>
            <li>2. Go to Products → Add product</li>
            <li>3. Fill in product details and save</li>
            <li>4. Your products will appear here automatically</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Product count */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product: ShopifyProduct) => {
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
            <Card key={node.id} className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-shadow">
              <Link href={`/products/${node.handle}`}>
                <CardContent className="p-0">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition-opacity relative">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-white text-black">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm text-gray-700 font-medium line-clamp-2">{node.title}</h3>
                      <p className="text-sm font-medium text-gray-900 ml-2">{formattedPrice}</p>
                    </div>
                    {node.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{node.description.replace(/<[^>]*>/g, "")}</p>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Load more section (for future pagination) */}
      {products.length >= 100 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">Showing first 100 products. More pagination features coming soon.</p>
        </div>
      )}
    </>
  )
}

export function AllProducts() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={12} />}>
      <AllProductsContent />
    </Suspense>
  )
}
