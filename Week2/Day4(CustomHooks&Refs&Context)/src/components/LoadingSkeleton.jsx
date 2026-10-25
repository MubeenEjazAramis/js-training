export default function LoadingSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="recipe-grid" aria-label="Loading recipes" aria-busy="true">
      {skeletons.map((idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line tag"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
