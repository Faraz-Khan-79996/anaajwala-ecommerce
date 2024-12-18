import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error state

                const response = await axios.get('/api/product/products');
                setProducts(response.data); // Update products state
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;
