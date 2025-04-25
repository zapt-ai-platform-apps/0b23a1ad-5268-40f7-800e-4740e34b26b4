import React from 'react';

const EmptyState = ({ 
  message, 
  icon: Icon, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
      {Icon && <Icon className="w-12 h-12 text-gray-400 mb-3" />}
      <p className="text-gray-600 mb-4">{message}</p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;