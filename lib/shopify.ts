// Enhanced Shopify integration with caching
export async function shopifyFetch({
  query,
  variables,
  tags,
  revalidate = 60, // Default 1 minute cache
}: {
  query: string
  variables?: any
  tags?: string[]
  revalidate?: number | false
}) {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!endpoint.includes("myshopify.com") || !key) {
    console.error("Missing Shopify configuration. Please check your environment variables.")
    return {
      status: 500,
      error: "Shopify configuration missing",
    }
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
      next: {
        tags: tags || ["shopify"],
        revalidate: process.env.NODE_ENV === "development" ? 0 : revalidate, // No cache in dev
      },
    })

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`)
    }

    const data = await result.json()

    console.log('data:', data)

    if (data.errors) {
      console.error("Shopify GraphQL errors:", data.errors)
      throw new Error(data.errors[0].message)
    }

    console.log(`Shopify API called successfully. Products found: ${data.data?.products?.edges?.length || "N/A"}`)

    return {
      status: result.status,
      body: data,
    }
  } catch (error) {
    console.error("Shopify API Error:", error)
    return {
      status: 500,
      error: "Error receiving data",
    }
  }
}

// Enhanced product fetching with caching
export async function getAllProducts() {
  return shopifyFetch({
    query: `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
      }
    }`,
    tags: ["products"],
    revalidate: 30, // Cache for 30 seconds
  })
}

export async function getProduct(handle: string) {
  return shopifyFetch({
    query: `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    `,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  })
}

export async function getCollectionProducts(handle: string) {
  return shopifyFetch({
    query: `
      query getCollection($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          title
          description
          products(first: 100) {
            edges {
              node {
                id
                title
                description
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { handle },
    tags: ["collections", `collection-${handle}`],
  })
}

export async function getNewProducts() {
  return shopifyFetch({
    query: `{
      products(sortKey: CREATED_AT, reverse: true, first: 50) {
        edges {
          node {
            id
            title
            description
            handle
            createdAt
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
      }
    }`,
    tags: ["products", "new-products"],
    revalidate: 30, // Cache for 30 seconds
  })
}
