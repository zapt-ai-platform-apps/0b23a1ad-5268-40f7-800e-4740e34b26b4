import React from 'react';
import { DataProvider } from '../modules/core/context/DataContext';
import { ThemeProvider } from '../modules/core/context/ThemeContext';
import { NavigationProvider } from '../modules/core/context/NavigationContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </DataProvider>
    </ThemeProvider>
  );
}