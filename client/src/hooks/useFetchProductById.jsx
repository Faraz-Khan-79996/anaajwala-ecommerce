import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../config/endpoints";

/**
 * Custom hook to fetch a product by ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Object} - An object containing the product, loading, and error states.
 */
const useFetchProductById = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Prevent fetching if no id is provided.

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Replace the URL with your actual API endpoint
                const response = await axios.get(endpoints.getProduct(id));
                setProduct(response.data);
            } catch (err) {
                if (err.response && err.response.data) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};

export default useFetchProductById;
