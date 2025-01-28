import ProductForm from "../ProductForm";
import useFetchProductById from "../../../hooks/useFetchProductById";
import { useParams } from "react-router-dom";
import BarLoader from "../../../components/BarLoader";
import ErrorComponent from "../../../components/ErrorComponent";
import ErrorBar from "../../../components/ErrorBar";
import { useState } from "react";
import axios from "axios";
function EditProduct() {
    const { productId } = useParams();
    const { product, loading, error } = useFetchProductById(productId);
    const [productUpdating, setProductUpdating] = useState(false);
    const [updateError, setUpdateError] = useState();

    if (loading) {
        return <BarLoader />;
    }
    if (error) {
        return (
            <ErrorComponent
                header="Error while Fetching Component"
                message={error.message}
            />
        );
    }

    const updateProduct = async (data) => {
        try {
            setProductUpdating(() => true);
            // console.log(data);
            const imagesArray = data.images.split(",");
            const payLoad = { ...data, images: imagesArray };
            await axios.put(`/api/product/${product._id}/update`, payLoad, {
                withCredentials: true,
            });
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.data) {
                setUpdateError(err.response.data.message);
            } else {
                setUpdateError(err.message || "Something went wrong");
            }
        } finally {
            setProductUpdating(() => false);
        }
    };

    return (
        <div className="mt-10">
            {updateError && (
                <ErrorBar
                    heading={`Error updating the product`}
                    message={updateError.message}
                />
            )}
            <ProductForm
                product={product}
                onSubmit={updateProduct}
                loading={productUpdating}
            />
        </div>
    );
}

export default EditProduct;
