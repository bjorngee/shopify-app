import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <FeaturedProducts />
        </Suspense>
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
