import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ProductGridSkeleton } from "./product-card-skeleton"

export function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Skeleton height={40} width="40%" className="mx-auto mb-4" />
          <Skeleton height={24} width="60%" className="mx-auto" />
        </div>

        <div className="mt-12">
          <ProductGridSkeleton count={6} />
        </div>

        <div className="mt-12 text-center">
          <Skeleton height={48} width={200} className="mx-auto" />
        </div>
      </div>
    </section>
  )
}
