import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function CartItemSkeleton() {
  return (
    <div className="flex space-x-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Skeleton height="100%" />
      </div>

      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Skeleton height={20} width="60%" />
            <Skeleton height={20} width="20%" />
          </div>
          <Skeleton height={16} width="40%" className="mt-1" />
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Skeleton height={32} width={32} />
            <Skeleton height={20} width={20} />
            <Skeleton height={32} width={32} />
          </div>
          <Skeleton height={20} width={60} />
        </div>
      </div>
    </div>
  )
}

export function CartSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </div>
  )
}
