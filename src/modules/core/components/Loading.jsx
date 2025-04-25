import React from 'react';

const Loading = ({ size = 'medium', message = '' }) => {
  const sizes = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizes[size]} border-b-transparent border-purple-600 rounded-full animate-spin`}
      />
      {message && <p className="mt-2 text-purple-700 text-sm">{message}</p>}
    </div>
  );
};

export default Loading;