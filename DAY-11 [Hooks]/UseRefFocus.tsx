import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your name"
      />


      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}

export default FocusInput;