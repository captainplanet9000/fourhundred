"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Lightweight inlined useInView to avoid external dependency
function useInView(
  options?: IntersectionObserverInit & { triggerOnce?: boolean }
): readonly [(node: Element | null) => void, boolean] {
  const elementRef = useRef<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: if no IO support, consider it in view
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.triggerOnce) observer.disconnect();
        } else if (!options?.triggerOnce) {
          setInView(false);
        }
      },
      options
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.root, options?.rootMargin, options?.threshold, options?.triggerOnce]);

  const callbackRef = useCallback((node: Element | null) => {
    elementRef.current = node;
  }, []);

  return [callbackRef, inView] as const;
}

/**
 * Lazy loading image component that only loads when in view
 */
export function LazyImage({ 
  src, 
  alt, 
  fallback, 
  className = "",
  ...props 
}: { 
  src: string; 
  alt: string; 
  fallback: string;
  className?: string;
  [key: string]: any;
}) {
  const [imgSrc, setImgSrc] = useState(fallback);
  const [imgRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Start loading 200px before element comes into view
  });

  useEffect(() => {
    if (inView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImgSrc(src);
      img.onerror = () => setImgSrc(fallback);
    }
  }, [inView, src, fallback]);

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}

/**
 * Virtualized list component for efficient rendering of large lists
 */
export function VirtualizedList({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  // Calculate visible range
  const { startIndex, endIndex } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Calculate total height and offset
  const { totalHeight, offsetY } = useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    return { totalHeight, offsetY };
  }, [items.length, itemHeight, startIndex]);

  // Visible items
  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => {
      const itemIndex = startIndex + index;
      return (
        <div
          key={itemIndex}
          style={{
            position: "absolute",
            top: itemIndex * itemHeight,
            width: "100%",
            height: itemHeight,
          }}
        >
          {renderItem(item, itemIndex)}
        </div>
      );
    });
  }, [items, startIndex, endIndex, renderItem, itemHeight]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflow: "auto", position: "relative" }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for memoizing expensive computations
 */
export function useMemoizedValue<T>(
  computation: () => T,
  dependencies: any[]
): T {
  return useMemo(computation, dependencies);
}

/**
 * Hook for prefetching data
 */
export function usePrefetch<T>(
  fetchFn: () => Promise<T>,
  condition: boolean = true
): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (condition && !data) {
      fetchFn().then(setData);
    }
  }, [fetchFn, condition, data]);

  return data;
}

/**
 * Hook for infinite scrolling
 */
export function useInfiniteScroll(
  loadMore: () => void,
  hasMore: boolean,
  threshold = 100
) {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      !isLoading &&
      hasMore &&
      containerRef.current.scrollHeight -
        containerRef.current.scrollTop -
        containerRef.current.clientHeight <
        threshold
    ) {
      setIsLoading(true);
      loadMore();
      // Reset loading state after a delay to allow new data to render
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loadMore, hasMore, isLoading, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return { containerRef, isLoading };
}