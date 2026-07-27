import React,{ useState } from "react";
export default function AddProductForm() {
    const [productName, setProductName] = useState<string>("");
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (productName.trim() === "") {
      alert("Please enter a product name");
      return; 
    }
    console.log("Successfully added to inventory:", productName);
    setProductName(""); 
    };
    return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <input 
        type="text" 
        value={productName}
        onChange={(e) => setProductName(e.target.value)} // Inline handler
      />
      <button type="submit">Add to Database</button>
    </form>
    );
}