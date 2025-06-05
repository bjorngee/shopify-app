import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Skeleton height={40} width={40} />
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Skeleton height={32} width={32} circle />
            <Skeleton height={24} width={80} className="hidden sm:block" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height={20} width={80} />
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Skeleton height={40} width={40} />
            <Skeleton height={40} width={40} />
            <Skeleton height={40} width={40} />
          </div>
        </div>
      </div>
    </header>
  )
}
