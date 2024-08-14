import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ReadMore = ({ children, initialHeight = 400 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 775) {
        setIsExpanded(true); // Automatically expand on large screens
      } else {
        setIsExpanded(false); // Collapse on smaller screens
      }
    };

    // Initialize the state based on the current viewport size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <div
        style={{
          maxHeight: isExpanded ? "none" : `${initialHeight}px`,
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
          position: "relative",
        }}
      >
        {children}
        {!isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"
            style={{
              backdropFilter: "blur(5px)",
              opacity: "0.8",
              transition: "opacity 0.3s ease-in-out",
            }}
          ></div>
        )}
      </div>
      {!isExpanded && (
        <div className="text-center mt-4">
          <button
            onClick={toggleExpand}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center mx-auto"
          >
            <FaChevronDown className="mr-2" /> Read More
          </button>
        </div>
      )}
      {isExpanded && window.innerWidth < 775 && (
        <div className="text-center mt-4">
          <button
            onClick={toggleExpand}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center mx-auto"
          >
            <FaChevronUp className="mr-2" /> Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
