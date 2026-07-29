import { useEffect } from "react";
function Compo() {
  useEffect(() => {
  console.log("Mounted");
  return () => {
    console.log("Cleanup");
  };
}, []);
  return <h1>Hello</h1>;
}
export default Compo;