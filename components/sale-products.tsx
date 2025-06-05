import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllProducts } from "@/lib/shopify"

export async function SaleProducts() {
  // For now, we'll show all products as potential sale items
  // In a real implementation, you'd filter by a "sale" tag or compare prices
  const productsResponse = await getAllProducts()
  const allProducts = productsResponse.body?.data?.products?.edges || []

  // Filter products that might be on sale (this is a simplified example)
  // In reality, you'd use Shopify's compare_at_price or tags
  const saleProducts = allProducts.slice(0, 12) // Show first 12 as "sale" items

  if (saleProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sale items available</h3>
        <p className="text-gray-500">Check back soon for great deals!</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {saleProducts.length} item{saleProducts.length !== 1 ? "s" : ""} on sale
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {saleProducts.map((product: any) => {
          const { node } = product
          const price = Number.parseFloat(node.priceRange.minVariantPrice.amount)
          const currencyCode = node.priceRange.minVariantPrice.currencyCode
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
          }).format(price)

          // Simulate a sale price (20% off)
          const salePrice = price * 0.8
          const formattedSalePrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
          }).format(salePrice)

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
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">20% OFF</Badge>
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-white text-black">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm text-gray-700 font-medium line-clamp-2">{node.title}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-red-600">{formattedSalePrice}</p>
                      <p className="text-sm text-gray-500 line-through">{formattedPrice}</p>
                    </div>
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
