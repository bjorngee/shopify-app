import { type NextRequest, NextResponse } from "next/server"
import { createCart, getCart, addToCart, updateCartLines, removeFromCart } from "@/lib/cart"

export async function POST(request: NextRequest) {
  try {
    const { action, cartId, ...data } = await request.json()

    switch (action) {
      case "create":
        const createResponse = await createCart()
        return NextResponse.json(createResponse.body?.data?.cartCreate)

      case "get":
        if (!cartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 })
        }
        const getResponse = await getCart(cartId)
        return NextResponse.json(getResponse.body?.data?.cart)

      case "add":
        if (!cartId || !data.lines) {
          return NextResponse.json({ error: "Cart ID and lines required" }, { status: 400 })
        }
        const addResponse = await addToCart(cartId, data.lines)
        return NextResponse.json(addResponse.body?.data?.cartLinesAdd)

      case "update":
        if (!cartId || !data.lines) {
          return NextResponse.json({ error: "Cart ID and lines required" }, { status: 400 })
        }
        const updateResponse = await updateCartLines(cartId, data.lines)
        return NextResponse.json(updateResponse.body?.data?.cartLinesUpdate)

      case "remove":
        if (!cartId || !data.lineIds) {
          return NextResponse.json({ error: "Cart ID and line IDs required" }, { status: 400 })
        }
        const removeResponse = await removeFromCart(cartId, data.lineIds)
        return NextResponse.json(removeResponse.body?.data?.cartLinesRemove)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Cart API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
