import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Stay in the Loop</h2>
          <p className="mt-4 text-lg text-gray-500">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
          </p>
          <form className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border-gray-300 shadow-sm focus:ring-black focus:border-black sm:max-w-xs"
            />
            <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <Button type="submit" size="lg" className="w-full">
                Subscribe
              </Button>
            </div>
          </form>
          <p className="mt-3 text-sm text-gray-500">We care about your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
