import { useState } from "react";

function Fruits() {
  const [fruits, setFruits] = useState([
    "Apple",
    "Banana"
  ]);

  function addFruit() {
    setFruits(prevFruits => [...prevFruits,"Orange"]);
    setFruits(prevFruits =>[...prevFruits,"Pineapple"]);

  }
  console.log("Fruits component rendered. Current fruits:", fruits);
  return (
    <div>
      <button onClick={addFruit}>Add Fruit</button>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default Fruits;