import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigation } from '../context/NavigationContext';

const MainLayout = () => {
  const { navigationVisible } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Stars background - fixed to the page */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 1}s`
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
        
        {/* Cleaner gradient background for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-blue-900/80" />
      </div>
      
      {navigationVisible && <Navbar />}
      <main className="flex-grow p-4 md:p-6 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;