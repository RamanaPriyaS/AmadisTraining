type Props = {
    isLoading:boolean;
    error : string | null;
    data:string[] | null;
};
function ProductList({isLoading,error,data}:Props)
{
    if (isLoading)
        return <p>Loading Products</p>
    
    if (error){
        return <p>Failed to load : {error}</p>
    }
    if (!data || data.length===0){
        return <p>No products available</p>
    }
    return(
        <ul>
            {data.map((item,i)=>(<li key={i}>{item}</li>
        ))}
        </ul>
    );

};
export default ProductList;