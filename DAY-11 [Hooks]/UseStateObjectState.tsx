import { useState } from "react"

export default function User(){
    const[user,setUser]=useState({
        name:"John",
        age:23
    });
    function increaseAge(){
        if (user.age<100){
        setUser({...user,age :user.age+1});
    }}
    return(
        <div>
            <h2>{user.name}</h2>
            <h2>{user.age}</h2>
            <button onClick={increaseAge} disabled={user.age>=30}>Increase Age</button>
        </div>

    )
}