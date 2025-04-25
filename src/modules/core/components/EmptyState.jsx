import React from 'react';
import { FaStar, FaRocket } from 'react-icons/fa';

const EmptyState = ({ 
  message, 
  icon: Icon, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-indigo-700 bg-indigo-950/60 backdrop-blur-sm relative">
      {/* Decorative stars */}
      <div className="absolute top-5 left-5 text-yellow-300/40">
        <FaStar />
      </div>
      <div className="absolute bottom-5 right-10 text-yellow-300/30">
        <FaStar />
      </div>
      <div className="absolute top-10 right-20 text-yellow-300/20">
        <FaStar />
      </div>
      
      {Icon && <Icon className="w-12 h-12 text-indigo-400 mb-3" />}
      <p className="text-indigo-200 mb-4">{message}</p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer flex items-center"
        >
          {actionText} <FaRocket className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default EmptyState;