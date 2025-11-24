"use client";

import { useResponsiveValue } from "./ResponsiveLayout";

/**
 * Skeleton loader for gallery items
 */
export function GalleryItemSkeleton() {
  return (
    <div className="card p-3 animate-pulse">
      <div className="aspect-square bg-gray-800 rounded-md"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for token detail page
 */
export function TokenDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-gray-800 rounded w-32"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="card p-4">
            <div className="aspect-square bg-gray-800 rounded-lg"></div>
          </div>
          
          <div className="card p-6 space-y-4">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="h-3 bg-gray-800 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-16"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-800 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="card p-6">
            <div className="h-8 bg-gray-800 rounded w-32 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800">
                  <div className="h-3 bg-gray-700 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card p-6">
            <div className="h-8 bg-gray-800 rounded w-24 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="card p-6">
            <div className="h-8 bg-gray-800 rounded w-32 mb-4"></div>
            <div className="h-48 bg-gray-800 rounded flex items-center justify-center">
              <div className="text-gray-600">Loading chart...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading spinner component
 */
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-gilded-500 ${sizeClasses[size]}`}></div>
    </div>
  );
}

/**
 * Full page loader
 */
export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Error boundary fallback component
 */
export function ErrorFallback({ 
  error, 
  resetError 
}: { 
  error: Error; 
  resetError: () => void; 
}) {
  return (
    <div className="card p-6 text-center">
      <div className="text-red-400 text-4xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-white/70 mb-4">{error.message}</p>
      <button 
        onClick={resetError}
        className="btn btn-primary"
      >
        Try again
      </button>
    </div>
  );
}

/**
 * Connection error component
 */
export function ConnectionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="card p-6 text-center">
      <div className="text-yellow-400 text-4xl mb-4">🔌</div>
      <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
      <p className="text-white/70 mb-4">
        Unable to connect to the network. Please check your connection and try again.
      </p>
      <button 
        onClick={onRetry}
        className="btn btn-primary"
      >
        Retry
      </button>
    </div>
  );
}

/**
 * Not found component
 */
export function NotFound({ message = "Item not found" }: { message?: string }) {
  return (
    <div className="card p-6 text-center">
      <div className="text-gilded-400 text-4xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold mb-2">Not Found</h2>
      <p className="text-white/70">{message}</p>
    </div>
  );
}

/**
 * Responsive grid component for gallery
 */
export function ResponsiveGrid({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const gridClasses = useResponsiveValue({
    mobile: "grid grid-cols-2 gap-3",
    tablet: "grid grid-cols-3 gap-4",
    desktop: "grid grid-cols-5 gap-4"
  });

  return (
    <div className={`${gridClasses} ${className}`}>
      {children}
    </div>
  );
}