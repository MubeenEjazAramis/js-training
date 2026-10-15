export default function Card({ title, children }) {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "12px 0"
  };

  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
