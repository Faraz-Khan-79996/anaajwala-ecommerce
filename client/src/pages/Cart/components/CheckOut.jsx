import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

function CheckOut({ loading }) {
    const { handleSubmit } = useFormContext();
    const { user } = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    return (
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Check Out
            </h3>
            <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                        <img
                            className="w-full h-full"
                            alt="logo"
                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                        />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                            Delivery Charge
                            <br />
                            <span className="font-normal">
                                (Delivery time may vary)
                            </span>
                        </p>
                    </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    ₹0.00
                </p>
            </div>
            <div className="w-full flex justify-center items-center">
                <button
                    className={`${user == null || cart == null || cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white`}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={user == null || cart == null || cart.length == 0}
                >
                    Order Now
                    {loading && <Spinner className="ml-2 h-8" />}
                </button>
            </div>
        </div>
    );
}

export default CheckOut;
