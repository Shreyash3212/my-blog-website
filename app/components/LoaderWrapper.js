'use client';
import { useLoading } from '../contexts/LoadingContext';
import CreativeLoader from './Loader';

const LoaderWrapper = () => {
  const { isLoading } = useLoading();

  return (
    <CreativeLoader 
      isVisible={isLoading}
      messages={[
        "Loading...",
        "Preparing your content...",
        "Almost ready...",
        "Just a moment..."
      ]}
      duration={800}
      backgroundColor="bg-black bg-opacity-95"
    />
  );
};

export default LoaderWrapper;
