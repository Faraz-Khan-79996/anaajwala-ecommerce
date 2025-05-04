import React from "react";

// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { Button } from "flowbite-react";
// import { AiOutlineMenu } from "react-icons/ai";
import axios from "axios";
import OrderRows from "./components/OrderRows";

export default function Page1() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState([]);
    const [tab, setTab] = useState(1);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            setLoading((prev) => true);
            const { data } = await axios.get("/api/order/orders");
            setOrders(data);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading((prev) => false);
        }
    };

    const activeClass = "border-b-purple-600 text-purple-600";
    const normalClass = "text-gray-600";

    return (
        <>
            <div className="mx-auto max-w-screen-xl bg-white">
                <h1 className="text-center mx-auto text-2xl font-bold text-gray-900">
                    Order Management
                </h1>
                <div className="bg-white py-2 px-3">
                    <nav className="flex flex-wrap gap-4">
                        <a
                            href="#"
                            onClick={() => setTab(1)}
                            className={`${
                                tab == 1 ? activeClass : normalClass
                            }  inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600`}
                        >
                            {" "}
                            Pending orders{" "}
                        </a>
                        <a
                            href="#"
                            onClick={() => setTab(2)}
                            className={`${
                                tab == 2 ? activeClass : normalClass
                            }inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600`}
                        >
                            {" "}
                            Shipped{" "}
                        </a>
                        <a
                            href="#"
                            onClick={() => setTab(3)}
                            className={`${
                                tab == 3 ? activeClass : normalClass
                            }inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600`}
                        >
                            {" "}
                            Delivered{" "}
                        </a>
                        <a
                            href="#"
                            onClick={() => setTab(4)}
                            className={`${
                                tab == 4 ? activeClass : normalClass
                            }inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600`}
                        >
                            {" "}
                            Canceled{" "}
                        </a>
                        {/* <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
            >
              {" "}
              Suppliers{" "}
            </a> */}
                    </nav>
                </div>
            </div>
            <div className="w-screen bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-2 py-10">
                    <div className="mt-4 w-full">
                        <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                            <form className="relative flex w-full max-w-2xl items-center">
                                <svg
                                    className="absolute left-2 block h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle
                                        cx={11}
                                        cy={11}
                                        r={8}
                                        className=""
                                    />
                                    <line
                                        x1={21}
                                        y1={21}
                                        x2="16.65"
                                        y2="16.65"
                                        className=""
                                    />
                                </svg>
                                <input
                                    type="name"
                                    name="search"
                                    className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                                    placeholder="Search by Order ID, Date, Customer"
                                    disabled
                                />
                            </form>
                            <button
                                type="button"
                                className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                            >
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                                <svg
                                    className="mr-2 h-3 w-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Overflow property here */}
                    <div className="mt-6 overflow-auto rounded-xl bg-white px-6 shadow lg:px-4">
                        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                            <thead className="hidden border-b lg:table-header-group">
                                <tr className="">
                                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                        Order Date
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="float-right mt-1 h-3 w-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Order ID
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Contact no.
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Customer
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Price
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="float-right mt-1 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                            />
                                        </svg>
                                    </td>
                                    {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Weight
                  </td> */}
                                    <td className="whitespace-normal text-center py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Payment Status
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Status
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Description
                                    </td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Invoice
                                    </td>
                                </tr>
                            </thead>
                            {tab == 1 && (
                                <OrderRows
                                    orders={orders}
                                    status={"pending"}
                                    setOrders={setOrders}
                                />
                            )}
                            {tab == 2 && (
                                <OrderRows
                                    orders={orders}
                                    status={"shipped"}
                                    setOrders={setOrders}
                                />
                            )}
                            {tab == 3 && (
                                <OrderRows
                                    orders={orders}
                                    status={"delivered"}
                                    setOrders={setOrders}
                                />
                            )}
                            {tab == 4 && (
                                <OrderRows
                                    orders={orders}
                                    status={"cancelled"}
                                    setOrders={setOrders}
                                />
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
