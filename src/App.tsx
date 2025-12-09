import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import LiveOperations from './pages/LiveOperations';
import OptimizationEngine from './pages/OptimizationEngine';
import EventCenter from './pages/EventCenter';
import Assets from './pages/Assets';
import ScenarioStudio from './pages/ScenarioStudio';
import Insights from './pages/Insights';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Live Operations' },
    { path: '/optimization', label: 'Optimization' },
    { path: '/events', label: 'Events' },
    { path: '/assets', label: 'Assets' },
    { path: '/scenarios', label: 'Scenarios' },
    { path: '/insights', label: 'Insights' }
  ];

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-logo">⚡ JerseyGrid DC Copilot</div>
        <div className="nav-links">
          {navLinks.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<LiveOperations />} />
          <Route path="/optimization" element={<OptimizationEngine />} />
          <Route path="/events" element={<EventCenter />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/scenarios" element={<ScenarioStudio />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
