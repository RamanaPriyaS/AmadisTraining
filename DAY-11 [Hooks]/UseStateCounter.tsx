import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

const handleIncrease = () => {
    setCount(count+1);
  };
  return (
    <div>
      <h2>{count}</h2>

      <button onClick={handleIncrease}>
        Increase
      </button>
    </div>
  );
}
export default Counter;