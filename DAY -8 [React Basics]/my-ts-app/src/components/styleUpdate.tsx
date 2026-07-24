import { useState } from 'react';

function Box() {
  const [color, setColor] = useState('skyblue');

  return (
    <div>
      <div
        style={{
          backgroundColor: color,
          width: 100,
          height: 100,
        }}
      />
      <button onClick={() => setColor('tomato')}>Red</button>
      <button onClick={() => setColor('skyblue')}>Blue</button>
    </div>
  );
}
export default Box;