import { useContext } from "react";
import UserContext from "./UseContextUserContext";

function GrandChild() {
  const user = useContext(UserContext);

  return <h2>Welcome {user}</h2>;
}

export default GrandChild;