import { useState, useEffect } from 'react';
import Header from './components/Header';
import SignupForm from './components/SignupForm';
import StateInspector from './components/StateInspector';
import VisualStatesGuide from './components/VisualStatesGuide';
import EvaluationGuide from './components/EvaluationGuide';
import Footer from './components/Footer';

/**
 * App Component
 * 
 * Top-level application coordinator.
 * Manages theme state (Light/Dark mode) and active tab view.
 */
export default function App() {
  // Theme state with localStorage fallback
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('w2d5_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('form');

  // Holds current live form state snapshot for the inspector
  const [liveSnapshot, setLiveSnapshot] = useState(null);

  // Sync theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('w2d5_theme', theme);
    } catch {
      // ignore storage access errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-layout">
      {/* App Header with tabs and theme toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-container">
          {activeTab === 'form' && (
            <div className="form-view-wrapper">
              {/* Primary Signup Form */}
              <SignupForm onStateChange={setLiveSnapshot} />

              {/* Collapsible React DevTools / State Inspector */}
              <StateInspector stateSnapshot={liveSnapshot} />
            </div>
          )}

          {activeTab === 'visual-states' && (
            <VisualStatesGuide />
          )}

          {activeTab === 'evaluation' && (
            <EvaluationGuide />
          )}
        </div>
      </main>

      {/* App Footer */}
      <Footer />
    </div>
  );
}
