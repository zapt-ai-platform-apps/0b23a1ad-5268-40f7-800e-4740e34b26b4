import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-md py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} The Secret Super App
            </p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/learning" 
              className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
            >
              Pembelajaran
            </Link>
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
            >
              ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;