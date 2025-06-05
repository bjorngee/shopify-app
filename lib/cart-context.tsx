"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Cart } from "./cart"

interface CartState {
  cart: Cart | null
  isLoading: boolean
  isOpen: boolean
}

interface CartContextType extends CartState {
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "SET_CART"; payload: Cart | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, isLoading: false }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "OPEN_CART":
      return { ...state, isOpen: true }
    case "CLOSE_CART":
      return { ...state, isOpen: false }
    case "CLEAR_CART":
      return { ...state, cart: null }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isLoading: false,
    isOpen: false,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem("shopify-cart-id")
    if (cartId) {
      loadCart(cartId)
    }
  }, [])

  const loadCart = async (cartId: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get", cartId }),
      })
      const cart = await response.json()
      dispatch({ type: "SET_CART", payload: cart })
    } catch (error) {
      console.error("Error loading cart:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const createCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create" }),
      })
      const result = await response.json()
      const cart = result.cart
      if (cart) {
        localStorage.setItem("shopify-cart-id", cart.id)
        dispatch({ type: "SET_CART", payload: cart })
        return cart
      }
    } catch (error) {
      console.error("Error creating cart:", error)
    }
    return null
  }

  const addItem = async (variantId: string, quantity = 1) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      let cartId = state.cart?.id
      if (!cartId) {
        const newCart = await createCart()
        cartId = newCart?.id
      }

      if (!cartId) {
        throw new Error("Failed to create cart")
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        }),
      })

      const result = await response.json()
      if (result.cart) {
        dispatch({ type: "SET_CART", payload: result.cart })
        dispatch({ type: "OPEN_CART" })
      }
    } catch (error) {
      console.error("Error adding item to cart:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const removeItem = async (lineId: string) => {
    if (!state.cart?.id) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          cartId: state.cart.id,
          lineIds: [lineId],
        }),
      })

      const result = await response.json()
      if (result.cart) {
        dispatch({ type: "SET_CART", payload: result.cart })
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateItem = async (lineId: string, quantity: number) => {
    if (!state.cart?.id) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          cartId: state.cart.id,
          lines: [{ id: lineId, quantity }],
        }),
      })

      const result = await response.json()
      if (result.cart) {
        dispatch({ type: "SET_CART", payload: result.cart })
      }
    } catch (error) {
      console.error("Error updating item in cart:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const openCart = () => dispatch({ type: "OPEN_CART" })
  const closeCart = () => dispatch({ type: "CLOSE_CART" })
  const clearCart = () => {
    localStorage.removeItem("shopify-cart-id")
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateItem,
        openCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
