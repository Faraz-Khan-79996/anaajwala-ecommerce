import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../../features/cart/CartSlice";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineInsertComment } from "react-icons/md";

function ProductCard({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notify = () =>
        toast.success("Added to cart!", {
            autoClose: 800,
            position: "bottom-right",
            theme: "dark",
        });
    const handleAddToCart = () => {
        try {
            dispatch(
                addToCart({
                    id: item._id,
                    product: item,
                    quantity: 1,
                })
            );
            notify();
        } catch (error) {
            console.log(error);
        }
    };

    function handleNavigate(item) {
        navigate(`/product/${item._id}`);
    }

    return (
        <>
            <div className="rounded overflow-hidden shadow-lg flex flex-col hidden sm:block">
                <ToastContainer />
                <a href="#" />
                <div className="relative">
                    <Link to={`/product/${item._id}`}>
                        <img
                            className="w-full h-48 object-cover"
                            src={item.thumbnail}
                            alt=".."
                        />
                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                    </Link>
                    <a href="#!">
                        <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            {item.category}
                        </div>
                    </a>
                </div>
                <div className="px-6 py-4 mb-auto">
                    <Link
                        to={`/product/${item._id}`}
                        className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                    >
                        {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span
                        href="#"
                        className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                    >
                        <span className="ml-1 line-through font-semibold text-lg">
                            ₹{item.MRP}
                        </span>
                        <span className="ml-3 font-semibold text-lg">
                            ₹{item.price}{" "}
                            <span className="text-sm font-light"></span>
                        </span>
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                    >
                        Add
                    </button>
                </div>
            </div>

            <>
                {/* component */}
                <div className="sm:hidden">
                    <ToastContainer />
                    <div className="relative flex flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg max-w-lg  md:max-w-3xl mx-auto border border-white bg-white">
                        <div className="w-full md:w-1/3 bg-white grid place-items-center">
                            <Link to={`/product/${item._id}`}>
                                <img
                                    src={item.thumbnail}
                                    alt="tailwind logo"
                                    className="rounded-xl h-36 w-36 md:max-h-full object-none"
                                />
                            </Link>
                        </div>
                        <div className="w-full md:w-2/3 bg-white flex flex-col just space-y-2 p-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg> */}
                                    <MdOutlineInsertComment size={13} />
                                    <p className="text-gray-600 font-bold text-[10px] md:text-sm ml-1">
                                        {/* 4.96 */}
                                        <span className="text-gray-500 font-normal">
                                            ({item.ratings.numberOfReviews}{" "}
                                            reviews)
                                        </span>
                                    </p>
                                </div>
                                {/* <div>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd" />
					</svg>
				</div> */}
                            </div>

                            <h3
                                onClick={() => handleNavigate(item)}
                                className="font-black text-gray-800 font-roboto text-[14px]  md:text-3xl"
                            >
                                {item.name}
                            </h3>
                            {/* <p class="text-gray-500 text-xs md:text-lg">The best kept secret of The Bahamas is the country’s sheer size
				and diversity. With 16 major islands, The Bahamas is an unmatched destination</p> */}
                            <p className="text-sm md:text-xl font-mono font-extralight italic text-gray-800">
                                <span className="ml-1 line-through font-mono text-sm mr-1">
                                    ${item.MRP}{" "}
                                </span>
                                {item.price}
                            </p>
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-1 min-w-[120px] font-varela text-center text-sm text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default ProductCard;
