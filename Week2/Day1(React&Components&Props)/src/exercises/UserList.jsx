export default function UserList() {
  const users = [
    { id: "u1", name: "Alice", role: "Designer" },
    { id: "u2", name: "Bob", role: "Developer" },
    { id: "u3", name: "Charlie", role: "Manager" },
    { id: "u4", name: "David", role: "Tester" },
    { id: "u5", name: "Emma", role: "Analyst" }
  ];

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> - {user.role}
        </li>
      ))}
    </ul>
  );
}
