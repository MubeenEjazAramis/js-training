import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import { products } from "./data/products";

export default function App() {
  const categories = [...new Set(products.map((item) => item.category))];

  return (
    <div className="app-container">
      <Header />
      <main className="catalog-wrapper">
        {categories.map((categoryName) => (
          <ProductGrid
            key={categoryName}
            category={categoryName}
            products={products.filter((item) => item.category === categoryName)}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
