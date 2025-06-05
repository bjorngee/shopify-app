import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function ProductDetailSkeleton() {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
      {/* Image gallery skeleton */}
      <div className="flex flex-col-reverse">
        {/* Image selector skeleton */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative h-24 bg-gray-200 rounded-md">
                <Skeleton height="100%" />
              </div>
            ))}
          </div>
        </div>

        {/* Main image skeleton */}
        <div className="w-full aspect-square">
          <Skeleton height="100%" className="sm:rounded-lg" />
        </div>
      </div>

      {/* Product info skeleton */}
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        {/* Title */}
        <Skeleton height={40} width="80%" className="mb-4" />

        {/* Price */}
        <div className="mt-3">
          <Skeleton height={32} width="30%" />
        </div>

        {/* Availability badge */}
        <div className="mt-6">
          <Skeleton height={24} width="20%" />
        </div>

        {/* Description */}
        <div className="mt-6 space-y-3">
          <Skeleton height={20} width="100%" />
          <Skeleton height={20} width="90%" />
          <Skeleton height={20} width="95%" />
          <Skeleton height={20} width="85%" />
        </div>

        {/* Options */}
        <div className="mt-6 space-y-4">
          <div>
            <Skeleton height={16} width="15%" className="mb-2" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={36} width={60} />
              ))}
            </div>
          </div>
        </div>

        {/* Add to cart button */}
        <div className="mt-10">
          <Skeleton height={48} width="100%" />
        </div>
      </div>
    </div>
  )
}
