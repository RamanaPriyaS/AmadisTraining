import { useState } from "react"

export default function UseStateInputField(){
    const[name,setName]=useState("");

    return(
        <div>Enter Name : 
            <input type="text" 
            value={name} 
            placeholder="Eg : John "
            onChange={(e)=>setName(e.target.value)} />
            <h2>Hi! Welcome, {name}</h2>
        </div>
        
    )
}