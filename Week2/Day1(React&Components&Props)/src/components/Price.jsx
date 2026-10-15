export default function Price({ amount }) {
  const formatted = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(amount).replace('PKR', 'Rs');

  return <span className="price">{formatted}</span>;
}
