import { useEffect } from "react";

function Effects() {

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return (
    <div>
      <h1>React useEffect</h1>
    </div>
  );
}

export default Effects;