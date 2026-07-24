import React,{useState} from "react";
function ConditionalFunctionRendering() {
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
    const toggleLogin = () =>{
        setIsLoggedIn(!isLoggedIn);
    }; 
    return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {isLoggedIn ? (
        <div>
          <h1>Welcome back, User!</h1>
          <button onClick={toggleLogin}>Log Out</button>
        </div>
      ) : (
        <div>
          <h1>Please log in to continue.</h1>
          <button onClick={toggleLogin}>Log In</button>
        </div>
      )}
    </div>
    )
}
export default ConditionalFunctionRendering;