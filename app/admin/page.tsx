"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  const [isClearing, setIsClearing] = useState(false)
  const [message, setMessage] = useState("")
  const [secret, setSecret] = useState("")

  const clearCache = async () => {
    if (!secret) {
      setMessage("Please enter the revalidation secret")
      return
    }

    setIsClearing(true)
    setMessage("")

    try {
      const response = await fetch(`/api/revalidate?secret=${secret}`, {
        method: "GET",
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("✅ Cache cleared successfully! New products should appear now.")
      } else {
        setMessage(`❌ Error: ${data.message}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Admin Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Clear Cache</h3>
              <p className="text-gray-600 mb-4">
                If you've added new products to Shopify and they're not showing up, clear the cache to force a refresh.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
                    Revalidation Secret
                  </label>
                  <Input
                    id="secret"
                    type="password"
                    placeholder="Enter your SHOPIFY_REVALIDATION_SECRET"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                </div>

                <Button onClick={clearCache} disabled={isClearing || !secret}>
                  {isClearing ? "Clearing Cache..." : "Clear Cache"}
                </Button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-4 rounded-md ${
                    message.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Environment Check</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Shopify Store Domain:</span>
                  <span className="font-mono">{process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="font-mono">{process.env.NODE_ENV}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
