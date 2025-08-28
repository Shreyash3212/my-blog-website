'use client';
import { LoadingProvider } from '../contexts/LoadingContext';
import LoaderWrapper from './LoaderWrapper';

export default function ClientLayout({ children }) {
  return (
    <LoadingProvider>
      <LoaderWrapper />
      {children}
    </LoadingProvider>
  );
}
