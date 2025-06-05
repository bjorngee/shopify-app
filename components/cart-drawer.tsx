"use client"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartSkeleton } from "@/components/skeletons/cart-skeleton"

export function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart()

  if (!isOpen) return null

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(Number.parseFloat(amount))
  }

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.open(cart.checkoutUrl, "_blank")
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {isLoading ? (
              <CartSkeleton />
            ) : !cart || cart.lines.edges.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.lines.edges.map(({ node: item }) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.merchandise.product.featuredImage?.url || "/placeholder.svg?height=64&width=64"}
                        alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="text-sm">{item.merchandise.product.title}</h3>
                          <p className="ml-4">
                            {formatPrice(item.cost.totalAmount.amount, item.cost.totalAmount.currencyCode)}
                          </p>
                        </div>
                        {item.merchandise.selectedOptions.length > 0 && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.merchandise.selectedOptions.map((option) => option.value).join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItem(item.id, Math.max(0, item.quantity - 1))}
                            disabled={isLoading}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.lines.edges.length > 0 && !isLoading && (
            <div className="border-t px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>{formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
              <Button onClick={handleCheckout} className="w-full" disabled={isLoading}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
