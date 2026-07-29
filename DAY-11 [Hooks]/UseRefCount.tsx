import { useRef } from "react";

function RefCount() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current++;
    console.log(countRef.current);
  };
  console.log("Rendered")

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}

export default RefCount;