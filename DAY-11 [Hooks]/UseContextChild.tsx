import GrandChild from "./UseContextGrandChild";
function Child() {
  return (
    <>
      <h2>Child Component</h2>
      <GrandChild />
    </>
  );
}

export default Child;