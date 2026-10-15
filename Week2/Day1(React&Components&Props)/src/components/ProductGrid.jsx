import ProductCard from "./ProductCard";

export default function ProductGrid({ category, products }) {
  return (
    <section className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="product-grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
