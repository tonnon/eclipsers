
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-eclipse-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
