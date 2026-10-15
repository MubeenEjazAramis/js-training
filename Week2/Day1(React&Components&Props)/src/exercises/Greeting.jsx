export default function Greeting({ name = "Guest" }) {
  return <h2 className="greeting">Hello, {name}!</h2>;
}
