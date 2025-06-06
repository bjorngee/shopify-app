import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewProducts } from "@/components/new-products"

export default function NewProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">New Arrivals</h1>
          <p className="mt-4 text-lg text-gray-500">Check out our latest products</p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <NewProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "New Arrivals | Your Store",
  description: "Discover our latest products and new arrivals",
}
