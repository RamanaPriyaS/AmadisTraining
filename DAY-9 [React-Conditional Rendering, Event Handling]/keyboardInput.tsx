import { useState } from "react";
export default function ProductSearch() {
const [searchQuery, setSearchQuery] = useState<string>("");
const handleSearchChange = (a: React.ChangeEvent<HTMLInputElement>) => {
  const newQuery = a.target.value;
  setSearchQuery(newQuery);
  console.log("Searching database for:", newQuery);
};
return (
    <div>
      <label htmlFor="search">Search Tech Inventory: </label>
      <input 
        id="search"
        type="text" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        placeholder="e.g., Wireless Mouse"/>
      <p>Current query: {searchQuery}</p>
    </div>
  );
}