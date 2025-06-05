import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollectionProducts } from "@/components/collection-products"
import { getCollectionProducts } from "@/lib/shopify"

interface CollectionPageProps {
  params: {
    handle: string
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collectionResponse = await getCollectionProducts(params.handle)
  const collection = collectionResponse.body?.data?.collectionByHandle

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{collection.title}</h1>
          {collection.description && <p className="mt-4 text-lg text-gray-500">{collection.description}</p>}
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <CollectionProducts products={collection.products.edges} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
