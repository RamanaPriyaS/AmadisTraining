import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
function Welcome() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const startQuiz = (event) => {
    event.preventDefault(); 
    if (username.trim() !== "") {
      navigate({
        to: "/quiz",
      });
    }
    // else{
    //   alert("Enter valid username")
    // }
  };
  return (
    <div>
      <h1>Welcome to Quiz App</h1>
      <form onSubmit={startQuiz}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)
          }
          required
        />
        <br />
        <br />
        <button type="submit">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Welcome;