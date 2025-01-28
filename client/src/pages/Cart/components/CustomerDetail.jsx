import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

import { Label, TextInput, Textarea } from "flowbite-react";
import { HiOutlinePhone } from "react-icons/hi";
import { TbMapPinCode } from "react-icons/tb";
import { useFormContext } from "react-hook-form";

function CustomerDetail({ cart }) {
    const userState = useSelector((state) => state.user);
    const {
        register,
        formState: { errors },
    } = useFormContext();
    // console.log(userState);

    if (!userState.user) {
        // if (true) {
        // console.log("Hellop");

        return (
            <div className="bg-red-300 border rounded-lg dark:bg-gray-800 w-full xl:w-96 flex justify-center items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h1 className=" text-red-800 font-semibold text-4xl">
                    You must be Logged in !
                </h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Customer Details
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        {/* <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                /> */}
                        <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                {userState.user.username}
                            </p>
                            {/* <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                        10 Previous Orders
                    </p> */}
                        </div>
                    </div>
                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 7L12 13L21 7"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 ">
                            {userState.user.phone_no}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                Shipping Details
                            </p>
                            {/* <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        180 North King Street, Northhampton MA 1060
                    </p> */}
                            <div className="mb-4 w-full">
                                <label
                                    htmlFor="pincode"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    {...register("pincode", {
                                        required: "Pincode is required",
                                    })}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.pincode && (
                                    <p className="text-red-500 mt-1">
                                        {errors.pincode.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4 w-full">
                                <label
                                    htmlFor="address"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    {...register("address", {
                                        required: "Address is required",
                                        minLength: {
                                            value: 35,
                                            message:
                                                "Address must be at least 35 characters",
                                        },
                                    })}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
                                    rows="4"
                                />
                                {errors.address && (
                                    <p className="text-red-500 mt-1">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                    Edit Details
                </button>
            </div> */}
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
