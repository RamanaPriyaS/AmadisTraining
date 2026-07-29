import { useState, useEffect } from "react";

function Dependency() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
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

export default Dependency;