import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SaleProducts } from "@/components/sale-products"

export default function SaleProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sale</h1>
          <p className="mt-4 text-lg text-gray-500">Great deals on selected products</p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <SaleProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Sale | Your Store",
  description: "Find great deals on our sale products",
}
