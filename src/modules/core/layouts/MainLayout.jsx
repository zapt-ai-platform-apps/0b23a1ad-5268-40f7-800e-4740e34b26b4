import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigation } from '../context/NavigationContext';

const MainLayout = () => {
  const { navigationVisible } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      {navigationVisible && <Navbar />}
      <main className="flex-grow p-4 md:p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;