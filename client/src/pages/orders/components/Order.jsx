import React, { useEffect, useState } from "react";
import { Accordion, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import OrderItem from "./OrderItem";
import Pill from "../../../components/Pill";

function Order({ order }) {
    return (
        <section className="py-24 pt-10 relative">
            <div className="w-full max-w-7xl px-0 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                    Order Summary
                </h2>
                <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                    Thanks for making a purchase you can check our order summary
                    frm below
                </p>
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">
                                Order Id:{" "}
                                <span className="text-indigo-600 font-medium">
                                    {order._id}
                                </span>
                            </p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">
                                Payment Status :{" "}
                                <span className="text-gray-400 font-medium">
                                    {" "}
                                    {/* {order.paymentStatus} */}
                                    <Pill
                                        mode={order.paymentStatus}
                                        text={order.paymentStatus}
                                    />
                                </span>
                            </p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">
                                Order Status :{" "}
                                <span className="text-gray-400 font-medium">
                                    {" "}
                                    <Pill
                                        mode={order.status}
                                        text={order.status}
                                    />
                                </span>
                            </p>
                        </div>
                        <a href={`/invoice/${order._id}`} target="_blank" rel="noopener noreferrer">
                            <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                Invoice
                            </button>
                        </a>

                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                        {order &&
                            order.items.length > 0 &&
                            order.items.map((item) => (
                                <OrderItem item={item} />
                            ))}
                        {/* <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                                    <div className="img-box max-lg:w-full">
                                        <img
                                            src="https://pagedone.io/asset/uploads/1701167621.png"
                                            alt="Diamond Watch image"
                                            className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                                        />
                                    </div>
                                    <div className="flex flex-row items-center w-full ">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                                        Diamond Platinum Watch
                                                    </h2>
                                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                                        Diamond Dials
                                                    </p>
                                                    <div className="flex items-center  ">
                                                        <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                            Size:{" "}
                                                            <span className="text-gray-500">
                                                                Regular
                                                            </span>
                                                        </p>
                                                        <p className="font-medium text-base leading-7 text-black ">
                                                            Qty:{" "}
                                                            <span className="text-gray-500">
                                                                1
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">
                                                            price
                                                        </p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                                            $100
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">
                                                            Status
                                                        </p>
                                                        <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                                            Dispatched
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                            Expected Delivery
                                                            Time
                                                        </p>
                                                        <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                            23rd March 2021
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            {/* <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                                        <svg
                                            className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={22}
                                            height={22}
                                            viewBox="0 0 22 22"
                                            fill="none"
                                        >
                                            <path
                                                d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                                                stroke=""
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        Cancel Order
                                    </button> */}
                            <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                                Delivery Address: <br />
                                <span className="text-gray-500">
                                    {order.address}
                                </span>
                                <br />
                                Pincode:{" "}
                                <span className="text-gray-500">
                                    {order.pincode}
                                </span>
                                <br />
                                Contact no :{" "}
                                <span className="text-gray-500">
                                    {order.customer_phone_no}
                                </span>
                                <br />
                                Customer name:{" "}
                                <span className="text-gray-500">
                                    {order.customerName}
                                </span>
                            </p>
                        </div>
                        <p className="font-semibold text-lg text-black py-6">
                            Total Price {"(including discount)"}:{" "}
                            <span className="text-indigo-600">
                                {" "}
                                ₹{order.totalPrice}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Order;
