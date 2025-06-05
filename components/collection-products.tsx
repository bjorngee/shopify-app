import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CollectionProductsProps {
  products: Array<{
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
    }
  }>
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No products found in this collection.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => {
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
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
