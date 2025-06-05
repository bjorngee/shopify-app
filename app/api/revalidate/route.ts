import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    // Get the webhook data
    const body = await request.json()
    console.log("Webhook received:", body)

    // Revalidate all product and collection data
    revalidateTag("products")
    revalidateTag("collections")
    revalidateTag("new-products")

    // Revalidate specific paths
    revalidatePath("/")
    revalidatePath("/collections/all")
    revalidatePath("/collections/new")
    revalidatePath("/collections/sale")

    // If it's a specific product, revalidate that too
    if (body.handle) {
      revalidateTag(`product-${body.handle}`)
      revalidatePath(`/products/${body.handle}`)
    }

    console.log("Revalidation completed successfully")

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache cleared successfully",
    })
  } catch (err) {
    console.error("Revalidation error:", err)
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Also handle GET requests for manual testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    // Manual revalidation
    revalidateTag("products")
    revalidateTag("collections")
    revalidateTag("new-products")

    revalidatePath("/")
    revalidatePath("/collections/all")
    revalidatePath("/collections/new")

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Manual cache clear completed",
    })
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
