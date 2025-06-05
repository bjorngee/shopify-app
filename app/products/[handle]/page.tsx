import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { getProduct } from "@/lib/shopify"

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productResponse = await getProduct(params.handle)
  const product = productResponse.body?.data?.productByHandle

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
          <ProductDetails product={product} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const productResponse = await getProduct(params.handle)
  const product = productResponse.body?.data?.productByHandle

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.edges.map((edge: any) => ({
        url: edge.node.url,
        width: edge.node.width,
        height: edge.node.height,
        alt: edge.node.altText || product.title,
      })),
    },
  }
}
