import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import axios from "axios";
import { addToCart } from "../../features/cart/CartSlice";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import Loader from "../../components/Loader";
import useFetchProducts from "../../hooks/useFetchProducts";
import SuggestedProductCard from "../../components/SuggestedProductCard";
import useFetchProductById from '../../hooks/useFetchProductById'

function ProductPage() {
    let { id } = useParams();
    const {product , error , loading } = useFetchProductById(id)
    const dispatch = useDispatch();
    const {
        products: suggestedProducts,
        loading: suggestedProductsLoading,
        error: suggestedProductError,
    } = useFetchProducts();
    const currentUrl = window.location.href;

    const navigate = useNavigate();

    const [texture, setTexture] = useState("fine");
    const [quantity, setQuantity] = useState(1);

    // const discount = {
    //     5: 0,
    //     10: 20,
    //     20: 20,
    // };

    // const type = ['fine' , 'coarse']

    useEffect(() => {
        // fetchProduct();
    }, [currentUrl]);

    const handleTypeChange = (ev) => {
      ev.preventDefault();
      console.log(ev.target.value);
      setTexture(ev.target.value);
    };
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product._id,
                product,
                quantity,
                texture
            })
        );
        notify();
    };

    const notify = () =>
        toast.success("Added to cart!", {
            autoClose: 800,
            position: "bottom-right",
            theme: "dark",
        });

    if (error) {
        return (
            <>
                <>
                    <Alert
                        onDismiss={() => setError(null)}
                        className="mb-4"
                        color="failure"
                        icon={HiInformationCircle}
                    >
                        <span className="font-medium">Error!</span> {error}
                    </Alert>
                </>
            </>
        );
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <ToastContainer />
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <nav className="flex">
                        <ol role="list" className="flex items-center">
                            <li className="text-left">
                                <div className="-m-1">
                                    <Link
                                        to="/"
                                        className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                    >
                                        {" "}
                                        Home{" "}
                                    </Link>
                                </div>
                            </li>
                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">
                                        /
                                    </span>
                                    <div className="-m-1">
                                        <Link
                                            to="/products"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                        >
                                            {" "}
                                            Products{" "}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">
                                        /
                                    </span>
                                    <div className="-m-1">
                                        <a
                                            href="#"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                            aria-current="page"
                                        >
                                            {" "}
                                            {product.name}{" "}
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img
                                            className="h-full w-full max-w-full object-cover"
                                            src={product.thumbnail}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                {/* <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src="https://media.istockphoto.com/id/483677659/photo/wheat-grains.jpg?s=612x612&w=0&k=20&c=fmzfhs0WpoBchI7ghh6LzvE__-XGfET1W8lDgAtisqI="
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src="https://media.istockphoto.com/id/483677659/photo/wheat-grains.jpg?s=612x612&w=0&k=20&c=fmzfhs0WpoBchI7ghh6LzvE__-XGfET1W8lDgAtisqI="
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src="https://media.istockphoto.com/id/483677659/photo/wheat-grains.jpg?s=612x612&w=0&k=20&c=fmzfhs0WpoBchI7ghh6LzvE__-XGfET1W8lDgAtisqI="
                        alt=""
                      />
                    </button>
                  </div>
                </div> */}
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                                {product.name}
                            </h1>
                            <div className="mt-5 flex items-center">
                                <div className="flex items-center">
                                    <svg
                                        className="block h-4 w-4 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            className=""
                                        />
                                    </svg>
                                    <svg
                                        className="block h-4 w-4 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            className=""
                                        />
                                    </svg>
                                    <svg
                                        className="block h-4 w-4 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            className=""
                                        />
                                    </svg>
                                    <svg
                                        className="block h-4 w-4 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            className=""
                                        />
                                    </svg>
                                    <svg
                                        className="block h-4 w-4 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            className=""
                                        />
                                    </svg>
                                </div>
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                    {product.ratings.numberOfReviews} Reviews
                                </p>
                            </div>
                            <h2 className="mt-8 text-base text-gray-900">
                                Texture
                            </h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                 <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="fine"
                    className="peer sr-only"
                    onChange={handleTypeChange}
                    checked={texture === "fine"}
                  />
                  <p
                    className={`${
                      texture == "fine" ? "bg-black text-white" : ""
                    } rounded-lg border border-black px-6 py-2 font-bold`}
                  >
                    Fine
                  </p>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="coarse"
                    className="peer sr-only"
                    onChange={handleTypeChange}
                    checked={texture === "coarse"}
                  />
                  <p
                    className={`${
                        texture == "coarse" ? "bg-black text-white" : ""
                    } rounded-lg border border-black px-6 py-2 font-bold`}
                  >
                    Coarse
                  </p>
                </label> 
                                {/* <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="diamond"
                                        className="peer sr-only"
                                    />
                                    <p
                                        className={`bg-black text-white rounded-lg border border-black px-6 py-2 font-bold`}
                                    >
                                        {product.type}
                                    </p>
                                </label> */}
                            </div>
                            <h2 className="mt-8 text-base text-gray-900">
                                Quantity
                            </h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label className="cursor-pointer">
                                    {/* <button>-</button>
                  <input
                    type="radio"
                    name="quantity"
                    value="5"
                    className="peer sr-only"
                    onChange={handleQuantityChange}
                    checked={true}
                  />
                  <button>+</button> */}

                                    <Button.Group>
                                        <Button
                                            color=""
                                            className="bg-black text-white"
                                            onClick={() =>
                                                setQuantity((prev) => {
                                                    if (prev - 1 >= 1)
                                                        return prev - 1;
                                                    return prev;
                                                })
                                            }
                                        >
                                            -
                                        </Button>
                                        <Button color="" className="border">
                                            {quantity}
                                        </Button>
                                        <Button
                                            color=""
                                            className="bg-black  text-white"
                                            onClick={() =>
                                                setQuantity((prev) => {
                                                    if (prev + 1 <= 5)
                                                        return prev + 1;
                                                    return prev;
                                                })
                                            }
                                        >
                                            +
                                        </Button>
                                    </Button.Group>

                                    {/* <p
                    className={`bg-black text-white rounded-lg border border-black px-6 py-2 font-bold`}
                  >
                    {product.size} Kg
                  </p> */}
                                    {/* <span className="mt-1 block text-center text-xs">$40/mo</span> */}
                                </label>
                                {/* <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="10"
                    className="peer sr-only"
                    onChange={handleQuantityChange}
                    checked={quantity === "10"}
                  />
                  <p
                    className={`${
                      quantity === "10" ? "bg-black text-white" : ""
                    } rounded-lg border border-black px-6 py-2 font-bold`}
                  >
                    10 Kg
                  </p>
                  <span className="mt-1 block text-center text-xs">$40/mo</span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="20"
                    className="peer sr-only"
                    onChange={handleQuantityChange}
                    checked={quantity === "20"}
                  />
                  <p
                    className={`${
                      quantity === "20" ? "bg-black text-white" : ""
                    } rounded-lg border border-black px-6 py-2 font-bold`}
                  >
                    20 Kg
                  </p>
                  <span className="mt-1 block text-center text-xs">$40/mo</span>
                </label> */}
                            </div>
                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className="text-3xl font-bold">
                                        ₹{product.price}
                                        {/* <span className="text-red-600 text-lg"> ₹(-{discount[quantity]}) discount</span> */}
                                    </h1>
                                    {/* <span className="text-base">/Kg</span> */}
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="shrink-0 mr-3 h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                            {/* <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    />
                  </svg>
                  Free shipping worldwide
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      className=""
                    />
                  </svg>
                  Cancel Anytime
                </li>
              </ul> */}
                        </div>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-300">
                                <nav className="flex gap-4">
                                    <a
                                        href="#"
                                        title=""
                                        className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                    >
                                        {" "}
                                        Description{" "}
                                    </a>
                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                                    >
                                        Reviews
                                        <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                                            {" "}
                                            {
                                                product.ratings.numberOfReviews
                                            }{" "}
                                        </span>
                                    </a>
                                </nav>
                            </div>
                            <div className="mt-8 flow-root sm:mt-12">
                                <h1 className="text-3xl font-bold">
                                    Delivered To Your Door
                                </h1>
                                {/* <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  accusantium nesciunt fuga.
                </p> */}
                                {/* <h1 className="mt-8 text-3xl font-bold">
                  From the Fine Farms of Brazil
                </h1> */}
                                {/* <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  numquam enim facere.
                </p> */}
                                <p className="mt-4">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto">
                <h2 className="font-semibold text-3xl">Suggested Products</h2>
                <div className="mx-auto scrollable-container flex justify-start my-10 overflow-x-scroll whitespace-nowrap pb-10">
                    {!suggestedProductsLoading &&
                        suggestedProducts &&
                        suggestedProducts.length > 0 &&
                        suggestedProducts.map((product) => (
                            <SuggestedProductCard
                                key={product._id}
                                product={product}
                                index={product._id}
                            />
                        ))}
                </div>
            </section>
        </div>
    );
}

export default ProductPage;
