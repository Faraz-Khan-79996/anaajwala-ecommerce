import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../config/endpoints";

const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error state

                const response = await axios.get(endpoints.getProducts);
                setProducts(response.data); // Update products state
            } catch (err) {
                if (err.response && err.response.data) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;
