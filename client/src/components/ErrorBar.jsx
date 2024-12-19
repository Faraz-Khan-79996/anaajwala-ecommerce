import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const ErrorBar = ({ heading="Error!" , message="Something went wrong. Please try again later." }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Hide the error bar
  };

  if (!isVisible) return null; // Do not render the error bar if it's not visible

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 z-50 bg-red-100 border border-red-400 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-semibold text-red-800">{heading}</p>
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <MdClose
          className="text-red-500 cursor-pointer"
          size={24}
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default ErrorBar;
