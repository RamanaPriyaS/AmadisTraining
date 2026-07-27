import { useState } from "react";
export default function ModeToggle() {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState<boolean>(false);
  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked at X coordinate:", e.clientX);
    setIsTrackingEnabled(prev => !prev);
  };
  return (
    <div>
      <h2>Skeletal Landmark Tracking: {isTrackingEnabled ? "ON" : "OFF"}</h2>
      <button onClick={handleToggleClick}>
        Toggle Tracking Mode
      </button>
    </div>
  );
}