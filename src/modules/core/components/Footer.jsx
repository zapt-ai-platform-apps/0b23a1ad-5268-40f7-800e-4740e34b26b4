import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaSpaceShuttle } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950/90 backdrop-blur-md border-t border-indigo-800/50 shadow-md py-4 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <FaSpaceShuttle className="text-indigo-400 mr-2" />
            <p className="text-sm text-indigo-300">
              &copy; {currentYear} The Secret Super App
            </p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/learning" 
              className="text-sm text-indigo-300 hover:text-yellow-300 transition-colors duration-200"
            >
              Pembelajaran
            </Link>
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-indigo-300 hover:text-yellow-300 transition-colors duration-200 flex items-center"
            >
              ZAPT <FaRocket className="ml-1 text-yellow-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;