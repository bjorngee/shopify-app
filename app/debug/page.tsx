import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DebugProducts } from "@/components/debug-products"

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        <Suspense fallback={<div>Loading debug information...</div>}>
          <DebugProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
