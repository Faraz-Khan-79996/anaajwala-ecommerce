import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// import "./SearchBar.css";

export default function SearchBar({products}) {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
  

    // const fetchData = (value) => {
    //   fetch("/api/product/products")
    //     .then((response) => response.json())
    //     .then((json) => {
    //       const filteredResults = json.filter((product) =>
    //         value && product?.name?.toLowerCase().includes(value)
    //       );
    //       setResults(filteredResults);
    //     });
    // };
  
    const handleChange = (value) => {
      setInput(value);
      // fetchData(value);

      const filteredResults = products.filter((product) => {
        const productName = product?.name?.toLowerCase() || "";
        
        // Create a regex to match characters in order (fuzzy search)
        const pattern = value
          .toLowerCase()
          .split("")
          .map((char) => `.*${char}`)
          .join(""); // Example: "ap" -> ".*a.*p"
      
        const regex = new RegExp(pattern);
      
        return regex.test(productName);
      });
      
            
      setResults(filteredResults);
    };
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
      // Check if blur is triggered by clicking inside results
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsFocused(false);
      }
    };
  
    return (
      <div className="search-container" onBlur={handleBlur} tabIndex={-1}>
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
  
        {isFocused && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    );
  }

export const SearchResult = ({ result , _id }) => {

    const navigate = useNavigate()
    // console.log(result);
    
    return (
      <div
        className="search-result"
        onClick={(e) => navigate(`/product/${_id}`)}
      >
        {result}
      </div>
    );
  };

  export const SearchResultsList = ({ results }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result.name} _id={result._id} key={id} />;
        })}
      </div>
    );
  };