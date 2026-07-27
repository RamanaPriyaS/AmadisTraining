import React, { useState } from 'react';
export default function FocusBlurExample() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    console.log(`Element focused: ${event.target.name}`);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    console.log(`Element blurred: ${event.target.name}`);
    if (inputValue.trim() === '') {
      console.warn('Input was left empty!');
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '300px' }}>
      <label 
        htmlFor="username" 
        style={{ 
          display: 'block', 
          marginBottom: '8px',
          color: isFocused ? '#2563eb' : '#374151',
          fontWeight: isFocused ? 'bold' : 'normal'
        }}
      >
        {isFocused ? 'Username (Typing...)' : 'Username'}
      </label>
      <input
        id="username"
        name="usernameInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter your username"
        style={{
          width: '100%',
          padding: '10px',
          border: `2px solid ${isFocused ? '#2563eb' : '#d1d5db'}`,
          borderRadius: '6px',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
      />
    </div>
  );
}