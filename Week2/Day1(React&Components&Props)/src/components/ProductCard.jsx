import Price from "./Price";
import Badge from "./Badge";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  console.log("This is the product Props:", product);
  const isSoldOut = product.stock === 0;
  const isTopRated = product.rating >= 4.5;

  return (
    <article className={`product-card ${isSoldOut ? "faded" : ""}`}>
      <div className="card-media">
        <img src={product.image} alt={product.name} />
        {isTopRated && <Badge type="top-rated" />}
      </div>
      <div className="card-content">
        <div className="card-header-row">
          <h3>{product.name}</h3>
          <Badge stock={product.stock} />
        </div>
        <Rating value={product.rating} />
        <div className="card-footer-row">
          <Price amount={product.price} />
          <span className="stock-info">{product.stock} left</span>
        </div>
      </div>
    </article>
  );
}
