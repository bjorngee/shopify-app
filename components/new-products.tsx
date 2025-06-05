import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNewProducts } from "@/lib/shopify"

interface ShopifyProduct {
  node: {
    id: string
    title: string
    handle: string
    description: string
    createdAt: string
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

export async function NewProducts() {
  // Fetch new products from Shopify (sorted by creation date)
  const productsResponse = await getNewProducts()
  const products = productsResponse.body?.data?.products?.edges || []

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No new products yet</h3>
        <p className="text-gray-500">Check back soon for our latest arrivals!</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {products.length} new product{products.length !== 1 ? "s" : ""} added recently
        </p>
      </div>

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

          // Check if product is truly "new" (within last 30 days)
          const createdDate = new Date(node.createdAt)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          const isNew = createdDate > thirtyDaysAgo

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
                    {isNew && <Badge className="absolute top-2 left-2 bg-green-500 text-white">New</Badge>}
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
                    <p className="text-xs text-gray-400">Added {createdDate.toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </>
  )
}
