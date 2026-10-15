export default function Badge({ stock, type }) {
  if (type === 'top-rated') {
    return <span className="badge badge-top-rated">Top rated</span>;
  }

  if (stock > 0) {
    return <span className="badge badge-in-stock">In stock</span>;
  }

  return <span className="badge badge-sold-out">Sold out</span>;
}
