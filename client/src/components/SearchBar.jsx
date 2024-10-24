import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ products }) {
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

        const filteredResults = products.filter((product) => {
            const productName = product?.name?.toLowerCase() || "";
            const pattern = value
                .toLowerCase()
                .split("")
                .map((char) => `.*${char}`)
                .join("");
            const regex = new RegExp(pattern);
            return regex.test(productName);
        });

        setResults(filteredResults);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
        }
    };

    return (
        <div className="relative w-full" onBlur={handleBlur} tabIndex={-1}>
            <div className="flex items-center w-full h-10 border border-gray-300 rounded-lg px-3 shadow-sm bg-gray-100">
                <FaSearch className="text-gray-500" />
                <input
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={handleFocus}
                    className="flex-grow border-none outline-none bg-transparent text-base ml-2"
                />
            </div>

            {isFocused && results.length > 0 && (
                <SearchResultsList results={results} />
            )}
        </div>
    );
}

export const SearchResult = ({ result, _id }) => {
    const navigate = useNavigate();

    return (
        <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/product/${_id}`)}
        >
            {result}
        </div>
    );
};

export const SearchResultsList = ({ results }) => {
    return (
        <div className="absolute top-12 w-full bg-white rounded-lg shadow-lg mt-1 max-h-52 overflow-y-auto z-10">
            {results.map((result, id) => (
                <SearchResult result={result.name} _id={result._id} key={id} />
            ))}
        </div>
    );
};