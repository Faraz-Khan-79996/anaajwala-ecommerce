import React from "react";

function CartItem({item}) {

    const discount = {
        5 : 0,
        10 : 20,
        20 : 20,
      }
    

    return (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
                <img
                    className="w-full hidden md:block"
                    src={item.product.thumbnail}
                    alt="dress"
                />
                <img
                    className="w-full md:hidden"
                    src={item.product.thumbnail}
                    alt="dress"
                />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-4">
                    <h3 className="text-sm dark:text-white xl:text-lg mr-2 font-semibold leading-6 text-gray-800">
                        {item.product.name}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-800">
                                Variant:{" "}
                            </span>{" "}
                            <span className="italic font-semibold">{item.product.type}</span>
                        </p>
                         <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-800">
                                Texture:{" "}
                            </span>{" "}
                            <span className="italic font-semibold">{item.texture}</span>
                        </p>
                        {/* <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                                Color:{" "}
                            </span>{" "}
                            Light Blue
                        </p>  */}
                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">
                        <span className="font-semibold font-mono">
                            x{item.quantity} 
                        </span>
                    </p>
                    <p className="font-semibold font-mono text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                        ₹{item.product.price}/pack
                    </p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    ₹{item.product.price * item.quantity}
                    {/* <span className="text-red-600 text-sm"> ₹(-{discount[item.quantity]}) discount</span> */}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
