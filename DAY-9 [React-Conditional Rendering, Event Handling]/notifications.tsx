export function NotificationG({itemCount} :{itemCount:number}){
    return(
        <div>
            {itemCount>0 && <span>Total : {itemCount} items</span>}
        </div>
    );
}