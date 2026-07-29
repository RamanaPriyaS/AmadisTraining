import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    },1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <h1>{seconds}</h1>
  );
}

export default App;