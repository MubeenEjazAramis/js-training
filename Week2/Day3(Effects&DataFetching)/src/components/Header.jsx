export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="brand">
          <div className="brand-icon">🍳</div>
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
