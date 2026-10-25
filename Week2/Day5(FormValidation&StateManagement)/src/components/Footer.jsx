/**
 * Footer Component
 * 
 * Clean footer displaying curriculum information, tech stack, and evaluation guidelines.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-title">
            <strong>JavaScript, React & Next.js Training</strong> • Week 2 Day 5
          </p>
          <p className="footer-text">
            Build: Validated Signup Form with Derived State & Blur-Based Error Visibility
          </p>
        </div>
        <div className="footer-right">
          <span className="footer-tag">React 19</span>
          <span className="footer-tag">Vite</span>
          <span className="footer-tag">Pure CSS</span>
          <span className="footer-tag">No Redundant State</span>
        </div>
      </div>
    </footer>
  );
}
