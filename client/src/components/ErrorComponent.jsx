import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorComponent = ({
    header = "Oops! Something Went Wrong",
    message = "We couldn't complete your request. Please try again later.",
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <div className="text-red-500">
                <FaExclamationTriangle size={80} />
            </div>
            <h1 className="text-3xl font-bold mt-4">{header}</h1>
            <p className="text-lg text-gray-600 mt-2 text-center px-4 max-w-md">
                {message}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            >
                Refresh Page
            </button>
        </div>
    );
};

export default ErrorComponent;
