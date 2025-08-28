'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading on initial page load
  const [loadingStartTime, setLoadingStartTime] = useState(Date.now());
  const pathname = usePathname();

  const startLoading = () => {
    setLoadingStartTime(Date.now());
    setIsLoading(true);
  };

  const stopLoading = () => {
    const elapsedTime = Date.now() - loadingStartTime;
    const minLoadingTime = 3000; // 3 seconds
    
    if (elapsedTime < minLoadingTime) {
      // Wait for the remaining time to ensure 3-second minimum
      setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime - elapsedTime);
    } else {
      setIsLoading(false);
    }
  };

  // Handle route changes
  useEffect(() => {
    startLoading();
    
    // Simulate page load completion after a short delay
    // In a real app, this would be triggered when your page is fully loaded
    const timer = setTimeout(() => {
      stopLoading();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
