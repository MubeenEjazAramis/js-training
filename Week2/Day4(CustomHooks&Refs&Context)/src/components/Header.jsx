import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Header({ activeView, onViewChange }) {
  // Access theme state and toggle function from ThemeContext
  const { theme, toggleTheme } = useTheme();

  // Access favorites state and drawer control from FavoritesContext
  const { favoritesCount, openDrawer } = useFavorites();

  return (
    <header className="app-header">
      <div className="container header-content">
        {/* Brand logo & title */}
        <div className="brand" onClick={() => onViewChange('recipes')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" y1="17" x2="18" y2="17" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">
              Gourmet<span>Finder v2</span>
            </h1>
          </div>
          <span className="brand-badge">Hooks & Context</span>
        </div>

        {/* Navigation & Controls */}
        <div className="header-actions">
          {/* View Mode Toggle: Recipe App vs Practice Lab */}
          <div className="view-toggle-group">
            <button
              type="button"
              className={`view-toggle-btn ${activeView === 'recipes' ? 'active' : ''}`}
              onClick={() => onViewChange('recipes')}
            >
              🍽️ Recipe App v2
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${activeView === 'practice' ? 'active' : ''}`}
              onClick={() => onViewChange('practice')}
            >
              🧪 Practice Lab (6)
            </button>
          </div>

          {/* Favorites Button with Badge Count */}
          <button
            type="button"
            className="header-btn favorites-toggle-btn"
            onClick={openDrawer}
            title="Open Favorites Panel"
            aria-label="View favorite recipes"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={favoritesCount > 0 ? '#ef4444' : 'none'}
              stroke={favoritesCount > 0 ? '#ef4444' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="favorites-text">Favorites</span>
            <span className="favorites-badge-count">{favoritesCount}</span>
          </button>

          {/* Theme Switcher: Light / Dark Mode Toggle */}
          <button
            type="button"
            className="header-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'light' ? (
              // Moon icon for switching to dark mode
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              // Sun icon for switching to light mode
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
            <span className="theme-text">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
