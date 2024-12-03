import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/CartSlice";
import { calculateCost } from "../hooks/cost";
import { Link } from "react-router-dom";
import emptyImage from '../assets/empty-order.png'

function CartDrawerContent({ handleClose }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { finalPrice } = calculateCost(cart, "");

    return (
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2
                                className="text-lg font-medium text-gray-900"
                                id="slide-over-title"
                            >
                                Shopping cart
                            </h2>
                            <div className="ml-3 flex h-7 items-center">
                                <button
                                    type="button"
                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={handleClose}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close panel</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul
                                    role="list"
                                    className="-my-6 divide-y divide-gray-200"
                                >
                                    {cart &&
                                        cart.length > 0 &&
                                        cart.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex py-6"
                                            >
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={
                                                            item.product
                                                                .thumbnail
                                                        }
                                                        alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-sm font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#" className="text-sm">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </a>
                                                            </h3>
                                                            <p className="ml-4 text-sm">
                                                                ₹
                                                                {
                                                                    item.product
                                                                        .price
                                                                }{" "}
                                                            </p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {item.product.type}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">
                                                            Qty {item.quantity}{" "}
                                                            
                                                        </p>
                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-red-600 hover:text-indigo-500"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeFromCart(
                                                                            {
                                                                                index,
                                                                            }
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {cart && cart.length == 0 && (<>
                                            <img src={emptyImage} alt="" />
                                        </>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>₹{finalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/user/cart"
                                onClick={handleClose}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{" "}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={handleClose}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> →</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDrawerContent;
