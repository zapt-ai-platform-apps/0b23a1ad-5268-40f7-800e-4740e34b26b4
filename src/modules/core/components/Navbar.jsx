import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiImage, FiHeart, FiMessageSquare, FiEye, FiBell, FiTarget, FiSmile, FiBook } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { useNavigation } from '../context/NavigationContext';
import { NAVIGATION_ITEMS } from '../constants';

const Navbar = () => {
  const { activePage, navigateTo } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home': return <FiHome className="w-5 h-5" />;
      case 'image': return <FiImage className="w-5 h-5" />;
      case 'heart': return <FiHeart className="w-5 h-5" />;
      case 'message-square': return <FiMessageSquare className="w-5 h-5" />;
      case 'eye': return <FiEye className="w-5 h-5" />;
      case 'bell': return <FiBell className="w-5 h-5" />;
      case 'target': return <FiTarget className="w-5 h-5" />;
      case 'smile': return <FiSmile className="w-5 h-5" />;
      case 'quote': return <FaQuoteLeft className="w-5 h-5" />;
      case 'book': return <FiBook className="w-5 h-5" />;
      default: return <FiHome className="w-5 h-5" />;
    }
  };

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/0b23a1ad-5268-40f7-800e-4740e34b26b4/efd69603-871a-4108-97ad-f49b7efbcc9f.png?width=32&height=32" 
                alt="Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="font-bold text-lg text-purple-700">The Secret Super App</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === item.path
                    ? 'text-purple-700 bg-purple-100'
                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                } transition-colors duration-200`}
                onClick={() => navigateTo(item.path)}
              >
                {getIcon(item.icon)}
                <span className="ml-1">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-purple-700 focus:outline-none cursor-pointer"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute left-0 right-0 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === item.path
                    ? 'text-purple-700 bg-purple-100'
                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                } transition-colors duration-200`}
                onClick={() => {
                  navigateTo(item.path);
                  closeMenu();
                }}
              >
                {getIcon(item.icon)}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;