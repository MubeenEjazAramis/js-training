export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="brand">
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
              Gourmet<span>Finder</span>
            </h1>
          </div>
          <span className="brand-badge">TheMealDB API</span>
        </div>

        <div className="header-meta">
          <div className="api-pill">
            <span className="live-dot"></span>
            <span>Live Recipes API</span>
          </div>
        </div>
      </div>
    </header>
  );
}
