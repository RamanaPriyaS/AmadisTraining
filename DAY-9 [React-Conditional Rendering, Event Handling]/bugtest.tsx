export function Cart({count}:{count:number}){
    // return <div><h1> Fallback : {count && <span>{count} items </span>}
    // </h1></div>
    return <div> {!!count && <span><h1>Count :{count} items </h1></span>}
    </div>
}