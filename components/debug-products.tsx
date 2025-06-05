import { getAllProducts } from "@/lib/shopify"

export async function DebugProducts() {
  const productsResponse = await getAllProducts()

  console.log("Full Shopify Response:", JSON.stringify(productsResponse, null, 2))

  const products = productsResponse.body?.data?.products?.edges || []
  const error = productsResponse.error

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Debug Information</h3>

      <div className="space-y-4 text-sm">
        <div>
          <strong>API Status:</strong> {productsResponse.status}
        </div>

        {error && (
          <div className="text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div>
          <strong>Products Found:</strong> {products.length}
        </div>

        <div>
          <strong>Environment Variables:</strong>
          <ul className="ml-4 mt-2">
            <li>SHOPIFY_STORE_DOMAIN: {process.env.SHOPIFY_STORE_DOMAIN ? "✅ Set" : "❌ Missing"}</li>
            <li>
              SHOPIFY_STOREFRONT_ACCESS_TOKEN: {process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "✅ Set" : "❌ Missing"}
            </li>
          </ul>
        </div>

        {products.length > 0 && (
          <div>
            <strong>Sample Products:</strong>
            <ul className="ml-4 mt-2 space-y-1">
              {products.slice(0, 3).map((product: any) => (
                <li key={product.node.id}>
                  {product.node.title} - {product.node.handle}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <strong>Raw Response:</strong>
          <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40 mt-2">
            {JSON.stringify(productsResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
