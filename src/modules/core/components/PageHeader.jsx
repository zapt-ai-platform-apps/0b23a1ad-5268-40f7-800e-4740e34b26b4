import React from 'react';
import { FaStar } from 'react-icons/fa';

const PageHeader = ({ title, description = '' }) => {
  return (
    <div className="mb-6 relative">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        <FaStar className="ml-3 text-yellow-300" />
      </div>
      {description && (
        <p className="mt-2 text-indigo-200">{description}</p>
      )}
      <div className="mt-2 h-1 w-20 bg-yellow-400 rounded-full"></div>
      
      {/* Decorative starfield */}
      <div className="absolute -right-2 -top-2 text-yellow-300/40 text-xs">
        <FaStar />
      </div>
      <div className="absolute right-10 top-1 text-yellow-300/30 text-xs">
        <FaStar />
      </div>
      <div className="absolute right-5 top-5 text-yellow-300/20 text-xs">
        <FaStar />
      </div>
    </div>
  );
};

export default PageHeader;