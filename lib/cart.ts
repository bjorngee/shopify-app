import { shopifyFetch } from "./shopify"

export interface CartItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: Array<{
      name: string
      value: string
    }>
    product: {
      id: string
      title: string
      handle: string
      featuredImage?: {
        url: string
        altText: string
      }
    }
    price: {
      amount: string
      currencyCode: string
    }
  }
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount?: {
      amount: string
      currencyCode: string
    }
  }
  lines: {
    edges: Array<{
      node: CartItem
    }>
  }
}

// Create a new cart
export async function createCart() {
  return shopifyFetch({
    query: `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    tags: ["cart"],
  })
}

// Get cart by ID
export async function getCart(cartId: string) {
  return shopifyFetch({
    query: `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      title
                      handle
                      featuredImage {
                        url
                        altText
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId },
    tags: ["cart"],
  })
}

// Add items to cart
export async function addToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  return shopifyFetch({
    query: `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
    tags: ["cart"],
  })
}

// Update cart line quantities
export async function updateCartLines(cartId: string, lines: Array<{ id: string; quantity: number }>) {
  return shopifyFetch({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, lines },
    tags: ["cart"],
  })
}

// Remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]) {
  return shopifyFetch({
    query: `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { cartId, lineIds },
    tags: ["cart"],
  })
}
