import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedProducts } from "@/components/featured-products"

interface CollectionPageProps {
  params: {
    handle: string
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl capitalize">
            {params.handle.replace("-", " ")}
          </h1>
          <p className="mt-4 text-lg text-gray-500">Discover our curated collection</p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <FeaturedProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
