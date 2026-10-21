/**
 * Header Component
 * 
 * Top navigation bar featuring:
 * - Program milestone badge
 * - Tab switcher to switch between Signup Form, Visual States, and Evaluation Prep
 * - Light / Dark theme toggle
 */
export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <header className="app-header">
      <div className="header-top-row">
        <div className="brand-group">
          <div className="brand-logo" aria-hidden="true">
            📝
          </div>
          <div className="brand-text">
            <div className="brand-badge-row">
              <span className="milestone-badge">Week 2 • Day 5</span>
              <span className="track-badge">React Fundamentals</span>
            </div>
            <h1 className="brand-title">Form Validation & State Management</h1>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="header-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="header-nav-tabs" aria-label="Main Navigation">
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'form' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Validated Signup Form</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'visual-states' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('visual-states')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
          <span>Visual States Guide</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'evaluation' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Evaluation Prep</span>
        </button>
      </nav>
    </header>
  );
}
