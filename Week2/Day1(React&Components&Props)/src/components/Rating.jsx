export default function Rating({ value }) {
  const rounded = Math.round(value);
  const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);

  return (
    <div className="rating">
      <span className="rating-stars">{stars}</span>
      <span className="rating-number">({value})</span>
    </div>
  );
}
