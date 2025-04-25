import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppProviders } from './AppProviders';

function App() {
  return (
    <Router>
      <AppProviders>
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {/* Stars background */}
          <div className="stars-container absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
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
            {Array.from({ length: 3 }).map((_, i) => (
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
            
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-blue-900/70 z-0"></div>
            
            {/* Planets */}
            <div 
              className="planet"
              style={{
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle at 30% 30%, #9381ff, #2c1e77)',
                right: '10%',
                top: '15%',
              }}
            />
            
            <div 
              className="orbit"
              style={{
                width: '200px',
                height: '200px',
                right: 'calc(10% - 50px)',
                top: 'calc(15% - 50px)',
              }}
            />
            
            <div 
              className="planet"
              style={{
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle at 30% 30%, #ffd166, #ef476f)',
                left: '15%',
                bottom: '20%',
              }}
            />
          </div>
          
          <AppRoutes />
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;