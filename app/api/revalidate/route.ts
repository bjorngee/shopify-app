import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const expectedSecret = process.env.SHOPIFY_REVALIDATION_SECRET

  console.log("Webhook POST - Secret received:", secret)
  console.log("Expected secret:", expectedSecret)
  console.log("Secrets match:", secret === expectedSecret)

  if (!expectedSecret) {
    console.error("SHOPIFY_REVALIDATION_SECRET environment variable not set")
    return NextResponse.json(
      {
        message: "Server configuration error: SHOPIFY_REVALIDATION_SECRET not set",
      },
      { status: 500 },
    )
  }

  if (secret !== expectedSecret) {
    console.error("Secret mismatch - received:", secret, "expected:", expectedSecret)
    return NextResponse.json(
      {
        message: "Invalid secret",
        debug: {
          received: secret,
          expected: expectedSecret ? "SET" : "NOT_SET",
          match: secret === expectedSecret,
        },
      },
      { status: 401 },
    )
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
  const expectedSecret = process.env.SHOPIFY_REVALIDATION_SECRET

  console.log("Manual GET - Secret received:", secret)
  console.log("Expected secret:", expectedSecret)
  console.log(
    "Environment variables available:",
    Object.keys(process.env).filter((key) => key.includes("SHOPIFY")),
  )

  if (!expectedSecret) {
    console.error("SHOPIFY_REVALIDATION_SECRET environment variable not set")
    return NextResponse.json(
      {
        message: "Server configuration error: SHOPIFY_REVALIDATION_SECRET not set",
        availableEnvVars: Object.keys(process.env).filter((key) => key.includes("SHOPIFY")),
      },
      { status: 500 },
    )
  }

  if (secret !== expectedSecret) {
    console.error("Secret mismatch")
    return NextResponse.json(
      {
        message: "Invalid secret",
        debug: {
          receivedLength: secret?.length || 0,
          expectedLength: expectedSecret.length,
          received: secret,
          expected: expectedSecret,
          match: secret === expectedSecret,
        },
      },
      { status: 401 },
    )
  }

  try {
    // Manual revalidation
    revalidateTag("products")
    revalidateTag("collections")
    revalidateTag("new-products")

    revalidatePath("/")
    revalidatePath("/collections/all")
    revalidatePath("/collections/new")

    console.log("Manual revalidation completed successfully")

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Manual cache clear completed",
    })
  } catch (err) {
    console.error("Manual revalidation error:", err)
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
