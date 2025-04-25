import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppProviders } from './AppProviders';

function App() {
  return (
    <Router>
      <AppProviders>
        <div className="min-h-screen flex flex-col">
          <AppRoutes />
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;