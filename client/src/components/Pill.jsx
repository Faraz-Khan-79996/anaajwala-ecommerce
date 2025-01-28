import React from "react";

export default function Pill({ mode, text }) {
    const colorCode = {
        pending: "medium",
        shipped: "purple",
        cancelled: "hard",
        delivered: "easy",
        completed: "easy",
        failed: "hard",
    };
    const colorMode = colorCode[mode];
    const getPillClasses = () => {
        switch (colorMode) {
            case "basic":
                return "bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "dark":
                return "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
            case "hard":
                return "bg-red-300 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "easy":
                return "bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "medium":
                return "bg-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "indigo":
                return "bg-indigo-300 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
            case "purple":
                return "bg-purple-300 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            case "pink":
                return "bg-pink-300 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
            default:
                return "bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        }
    };

    return (
        <>
            <span
                className={`text-sm my-auto font-medium me-2 px-2.5 py-0.5 rounded-2xl ${getPillClasses()}`}
            >
                {text}
            </span>
        </>
    );
}
