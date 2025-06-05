import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function HeroSkeleton() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="space-y-4">
                <Skeleton height={60} width="90%" />
                <Skeleton height={60} width="70%" />
              </div>
              <div className="mt-6 space-y-3">
                <Skeleton height={20} width="100%" />
                <Skeleton height={20} width="95%" />
                <Skeleton height={20} width="85%" />
              </div>
              <div className="mt-8 flex space-x-4">
                <Skeleton height={48} width={120} />
                <Skeleton height={48} width={140} />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Skeleton height="100%" className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full" />
      </div>
    </section>
  )
}
