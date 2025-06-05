import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function ProductCardSkeleton() {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Skeleton height="100%" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <Skeleton height={20} width="70%" />
          <Skeleton height={20} width="20%" />
        </div>
        <Skeleton height={16} width="90%" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
