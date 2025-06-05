"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductDetailsProps {
  product: {
    id: string
    title: string
    description: string
    handle: string
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
    variants: {
      edges: Array<{
        node: {
          id: string
          title: string
          priceV2: {
            amount: string
            currencyCode: string
          }
          availableForSale: boolean
          selectedOptions: Array<{
            name: string
            value: string
          }>
        }
      }>
    }
    options: Array<{
      id: string
      name: string
      values: string[]
    }>
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node)

  const images = product.images.edges
  const currentImage = images[selectedImageIndex]?.node

  const price = Number.parseFloat(selectedVariant?.priceV2.amount || product.priceRange.minVariantPrice.amount)
  const currencyCode = selectedVariant?.priceV2.currencyCode || product.priceRange.minVariantPrice.currencyCode
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(price)

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Redirect to Shopify checkout with the selected variant
      const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN}/cart/${selectedVariant.id}:1`
      window.open(checkoutUrl, "_blank")
    }
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
      {/* Image gallery */}
      <div className="flex flex-col-reverse">
        {/* Image selector */}
        {images.length > 1 && (
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-6">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
                    index === selectedImageIndex ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <span className="sr-only">{image.node.altText}</span>
                  <span className="absolute inset-0 rounded-md overflow-hidden">
                    <img
                      src={image.node.url || "/placeholder.svg"}
                      alt={image.node.altText || product.title}
                      className="w-full h-full object-center object-cover"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main image */}
        <div className="w-full aspect-square">
          <img
            src={currentImage?.url || "/placeholder.svg?height=600&width=600"}
            alt={currentImage?.altText || product.title}
            className="w-full h-full object-center object-cover sm:rounded-lg"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl text-gray-900">{formattedPrice}</p>
        </div>

        {/* Availability */}
        <div className="mt-6">
          {selectedVariant?.availableForSale ? (
            <Badge variant="default" className="bg-green-100 text-green-800">
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
          <div
            className="text-base text-gray-700 space-y-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* Options */}
        {product.options.map((option) => (
          <div key={option.id} className="mt-6">
            <h3 className="text-sm text-gray-600 font-medium">{option.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {option.values.map((value) => {
                const variant = product.variants.edges.find((v) =>
                  v.node.selectedOptions.some((opt) => opt.name === option.name && opt.value === value),
                )?.node

                return (
                  <button
                    key={value}
                    className={`px-3 py-2 text-sm border rounded-md ${
                      selectedVariant?.id === variant?.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => variant && setSelectedVariant(variant)}
                    disabled={!variant?.availableForSale}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="mt-10 flex sm:flex-col1">
          <Button onClick={handleAddToCart} disabled={!selectedVariant?.availableForSale} size="lg" className="w-full">
            {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  )
}
