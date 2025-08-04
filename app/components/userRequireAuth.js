'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useRequireAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
      } else {
        setLoading(false); // Safe to show page
      }
    }
  }, [router]);

  return loading;
}
