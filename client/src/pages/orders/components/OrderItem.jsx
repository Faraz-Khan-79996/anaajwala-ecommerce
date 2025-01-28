import React from "react";

function OrderItem({ item }) {
    return (
        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
            <div className="img-box max-lg:w-full">
                <img
                    src={item.thumbnail}
                    alt="Premium Watch image"
                    className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                />
            </div>
            <div className="flex flex-row items-center w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                        <div className="">
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                {item.productName}
                            </h2>
                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                Variant: {item.type}
                            </p>
                            <div className="flex items-center ">
                                {/* <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                            Size:{" "}
                            <span className="text-gray-500">
                                100 ml
                            </span>
                        </p> */}
                                <p className="font-medium text-base leading-7 text-black ">
                                    Qty:{" "}
                                    <span className="text-gray-500">
                                        {item.quantity} Kg
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">
                                    Price Total
                                </p>
                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    ₹{item.price}
                                </p>
                            </div>
                        </div>
                        {/* <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                    <div className="flex gap-3 lg:block">
                        <p className="font-medium text-sm leading-7 text-black">
                            Status
                        </p>
                        <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                            Ready for Delivery
                        </p>
                    </div>
                </div> */}
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm text-end whitespace-nowrap leading-6 text-black">
                                    Product id
                                </p>
                                <p className="font-medium text-end text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    {item.productId}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
