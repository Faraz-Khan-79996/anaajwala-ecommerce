import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SuggestedProductCard({ product, index }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        try {
            dispatch(
                addToCart({
                    id: product._id,
                    product: product,
                    quantity: 1,
                    texture: "fine",
                }),
            );
            notify();
        } catch (error) {
            console.log(error);
        }
    };
    const notify = () =>
        toast.success("Added to cart!", {
            autoClose: 1000,
            position: "bottom-right",
            theme: "dark",
        });

    return (
        <>
            <ToastContainer />
            <div key={index} className="max-w-72 min-w-[300px] mr-4">
                <div className="overflow-hidden rounded shadow-lg">
                    <a href="#" />
                    <div className="relative">
                        <Link to={`/product/${product._id}`}>
                            <img
                                className="w-full h-[220px]"
                                src={product.thumbnail}
                                alt="Sunset in the mountains"
                            />
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent" />
                        </Link>
                        <a href="#!">
                            <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
                                {product.type}
                            </div>
                        </a>
                        <a href="!#">
                            <div className="absolute right-0 top-0 mr-3 mt-3 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-indigo-600 px-4 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
                                <span className="font-bold">
                                    ₹{product.price}
                                </span>
                                <span className="line-through italic">
                                    ₹{product.MRP}{" "}
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="px-6 py-4 min-h-22">
                        <Link
                            to={`/product/${product._id}`}
                            className="inline-block text-lg text-wrap font-semibold transition duration-500 ease-in-out hover:text-indigo-600 !line-clamp-2"
                        >
                            {product.name}
                        </Link>

                        {/* <p className="text-sm text-gray-500 ">
                                The city that never sleeps
                            </p> */}
                    </div>
                    <div className="flex flex-row items-center justify-between px-6 py-4">
                        <span className="font-regular mr-1 flex flex-row items-center py-1 text-sm text-gray-900">
                            <FaRegComment className="text-yellow-500" />{" "}
                            {/* Star Icon */}
                            <span className="ml-1">
                                {product.ratings.numberOfReviews} Reviews
                            </span>
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="px-1 py-1 min-w-[90px] duration-200 font-semibold rounded-2xl text-center text-white bg-violet-600 border border-violet-600 active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuggestedProductCard;
