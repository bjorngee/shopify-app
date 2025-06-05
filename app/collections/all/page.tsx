import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AllProducts } from "@/components/all-products"

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">All Products</h1>
          <p className="mt-4 text-lg text-gray-500">Discover our complete collection of premium products</p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <AllProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "All Products | Your Store",
  description: "Browse our complete collection of premium products",
}
