import { useReducer } from "react";
const initalState=0;
function Reducer(state,action){
    switch (action.type){
        case "increment":
            return state+1;
        case "decrement":
            return state-1;
        case "reset":
            return 0;
        default:
            return state;
    }
}
export default function ReducerCount(){
    const[count,dispatch]=useReducer(Reducer,initalState);
    return(
        <div>
            <h2>Count: {count}</h2>

            <button onClick={() => dispatch({ type: "increment" })}>
                Increase
            </button>

            <button onClick={() => dispatch({ type: "decrement" })}>
                Decrease
            </button>

            <button onClick={() => dispatch({ type: "reset" })}>
                Reset
            </button>
        </div>
    )
}