interface UserCardProps {
  name: string;
  age: number;
  isOnline?: boolean; 
}

function UserCard({ name, age, isOnline = true }: UserCardProps) {
  return (
    <div>
      <h3>{name}, {age}</h3>
      <p>{isOnline ? "🟢 Online" : "⚪ Offline"}</p>
    </div>
  );
}
function Result() {
  return (
    <div>
        <UserCard name="Alice" age={25} />  
</div>
  );
}
export default Result;

