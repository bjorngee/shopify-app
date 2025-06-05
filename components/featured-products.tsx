import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock product data - in a real app, this would come from Shopify's GraphQL API
const featuredProducts = [
  {
    id: "1",
    title: "Premium Cotton T-Shirt",
    price: "$29.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/premium-cotton-tshirt",
  },
  {
    id: "2",
    title: "Denim Jacket",
    price: "$89.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/denim-jacket",
  },
  {
    id: "3",
    title: "Leather Sneakers",
    price: "$129.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/leather-sneakers",
  },
  {
    id: "4",
    title: "Wool Sweater",
    price: "$79.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/wool-sweater",
  },
  {
    id: "5",
    title: "Canvas Backpack",
    price: "$59.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/canvas-backpack",
  },
  {
    id: "6",
    title: "Silk Scarf",
    price: "$39.99",
    image: "/placeholder.svg?height=400&width=400",
    href: "/products/silk-scarf",
  },
]

export function FeaturedProducts() {
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
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer border-0 shadow-none">
              <Link href={product.href}>
                <CardContent className="p-0">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition-opacity">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 font-medium">{product.title}</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
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
