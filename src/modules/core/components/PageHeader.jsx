import React from 'react';

const PageHeader = ({ title, description = '' }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-purple-800">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
      <div className="mt-2 h-1 w-20 bg-yellow-400 rounded-full"></div>
    </div>
  );
};

export default PageHeader;