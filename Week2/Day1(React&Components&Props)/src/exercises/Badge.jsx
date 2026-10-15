export default function Badge({ stock }) {
  const isAvailable = stock > 0;
  const badgeStyle = {
    color: isAvailable ? "green" : "red",
    fontWeight: "bold"
  };

  return (
    <span style={badgeStyle}>
      {isAvailable ? "In stock" : "Sold out"}
    </span>
  );
}
