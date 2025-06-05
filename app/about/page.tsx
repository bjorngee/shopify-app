import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">About Us</h1>
          <p className="mt-4 text-xl text-gray-500">
            Crafting exceptional experiences through premium products and thoughtful design
          </p>
        </div>

        <div className="prose prose-lg mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded with a passion for quality and innovation, our store represents the perfect blend of traditional
              craftsmanship and modern design. We believe that every product should tell a story and enhance the lives
              of those who use them.
            </p>
            <p className="text-gray-700">
              From our carefully curated selection to our commitment to sustainable practices, every aspect of our
              business reflects our dedication to excellence and our respect for our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To provide exceptional products that inspire and delight, while building lasting relationships with our
                customers through outstanding service and genuine care.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Quality in everything we do</li>
                <li>• Sustainable and ethical practices</li>
                <li>• Customer-first approach</li>
                <li>• Innovation and creativity</li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you. Whether you have questions about our products, need assistance with an order,
              or just want to say hello, we're here to help.
            </p>
            <div className="space-y-2 text-gray-600">
              <p>Email: hello@yourstore.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Hours: Monday - Friday, 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "About Us | Your Store",
  description: "Learn about our story, mission, and values",
}
