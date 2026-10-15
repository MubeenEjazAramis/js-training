import Greeting from "./Greeting";
import Avatar from "./Avatar";
import Badge from "./Badge";
import Card from "./Card";
import UserList from "./UserList";
import Price from "./Price";
import FixJsx from "./FixJsx";

export default function ExerciseSuite() {
  return (
    <section className="exercises-container">
      <h2>Day 1 Practice Exercises</h2>
      <Card title="Greeting">
        <Greeting name="Guest" />
      </Card>
      <Card title="Avatar">
        <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="User avatar" size={64} />
      </Card>
      <Card title="Badge">
        <Badge stock={10} />
        <Badge stock={0} />
      </Card>
      <Card title="Card With Children">
        <p>This content is passed as children to the Card component.</p>
      </Card>
      <Card title="User List">
        <UserList />
      </Card>
      <Card title="Price Formatter">
        <Price amount={1200} />
      </Card>
      <Card title="Valid JSX Fix">
        <FixJsx />
      </Card>
    </section>
  );
}
