import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('/');
  const [navigationVisible, setNavigationVisible] = useState(true);

  const navigateTo = (path) => {
    navigate(path);
    setActivePage(path);
  };

  const toggleNavigation = () => {
    setNavigationVisible(prev => !prev);
  };

  const value = {
    activePage,
    navigateTo,
    navigationVisible,
    toggleNavigation,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}