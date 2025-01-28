import React from "react";
import { FaGift } from "react-icons/fa";

const BulkOrdersPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                {/* <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> &gt; <span className="font-medium">Bulk Orders | Corporate Gifts</span>
        </nav> */}

                {/* Heading */}
                <h1 className="text-3xl font-semibold mb-4">
                    Bulk Orders | Corporate Gifts
                </h1>
                <p className="text-xl mb-8">
                    Buying in bulk? We are happy to help!
                </p>

                {/* Content Section */}
                <div className="flex flex-col items-center mb-8">
                    {/* Icon and tagline */}
                    <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full mr-4">
                            <FaGift className="text-green-500 text-5xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-orange-500">
                            Show You Care
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-center leading-7 mb-4">
                        If you're looking for multiple quantities for Corporate
                        Gifting or Social Gifting (Birthday Gifts, Wedding
                        Gifts, Baby Shower Gifts, etc.), Sow Fresh presents to
                        you a special service for{" "}
                        <span className="font-semibold">
                            personalised, custom packaging
                        </span>{" "}
                        for bulk orders.
                    </p>

                    <p className="text-lg text-center leading-7 mb-4">
                        We offer a{" "}
                        <span className="font-semibold">
                            hassle-free experience
                        </span>{" "}
                        by managing your shipping directly to your customers
                        with your{" "}
                        <span className="font-semibold">
                            personalised cards/notes/newsletters
                        </span>
                        .
                    </p>
                </div>

                {/* Contact Details */}
                <div className="text-center mb-8">
                    <p className="text-lg mb-2">
                        Just Email, Call on the below details, or Fill the
                        Contact Form, and we shall do our best to understand
                        your requirement and deliver the most premium shopping
                        experience.
                    </p>

                    <p className="text-lg font-medium mb-2">
                        Phone:{" "}
                        <a href="tel:+918889990352" className="text-blue-500">
                            +91 8889990352
                        </a>
                        ,{" "}
                        <a href="tel:+918889990358" className="text-blue-500">
                            8889990358
                        </a>
                    </p>

                    <p className="text-lg font-medium">
                        Email:{" "}
                        <a
                            href="mailto:anajwalaproducts@gmail.com"
                            className="text-blue-500"
                        >
                            anajwalaproducts@gmail.com
                        </a>
                    </p>
                </div>

                {/* Footer Note */}
                <div className="text-center border-t border-gray-300 pt-6">
                    <p className="text-lg italic text-gray-600">
                        "Give the Gift of Health, Wellness & Goodness to your
                        Loved Ones"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BulkOrdersPage;
