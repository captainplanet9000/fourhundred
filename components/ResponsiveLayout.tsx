"use client";

import { useState, useEffect } from "react";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

/**
 * Provides responsive layout utilities and hooks for components
 */
export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoints = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    updateBreakpoints();

    // Add event listener
    window.addEventListener("resize", updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return (
    <div className="responsive-layout" data-mobile={isMobile} data-tablet={isTablet} data-desktop={isDesktop}>
      {children}
    </div>
  );
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoints = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    updateBreakpoints();

    // Add event listener
    window.addEventListener("resize", updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return { isMobile, isTablet, isDesktop };
}

/**
 * Hook to get responsive value based on breakpoint
 */
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop: T;
}): T {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (isMobile && values.mobile !== undefined) {
    return values.mobile;
  }

  if (isTablet && values.tablet !== undefined) {
    return values.tablet;
  }

  if (isDesktop) {
    return values.desktop;
  }

  // Fallback to desktop if no match
  return values.desktop;
}