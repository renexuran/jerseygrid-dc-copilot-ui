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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <nav style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '1rem 2rem',
        borderBottom: '2px solid var(--border-secondary)',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginRight: '2rem',
          color: 'var(--accent-electric)',
          textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
        }}>
          ⚡ JerseyGrid DC Copilot
        </div>
        {navLinks.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              style={{
                color: isActive ? 'var(--accent-electric)' : 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                border: isActive ? '1px solid var(--accent-electric)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem',
                fontWeight: isActive ? '600' : '400'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <main style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '2rem'
      }}>
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
