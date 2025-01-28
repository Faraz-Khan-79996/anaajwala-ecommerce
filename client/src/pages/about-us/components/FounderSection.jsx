import React from "react";
import Harsh from "../../../assets/Harsh1.jpg";
import { Link } from "react-router-dom";

function FounderSection() {
    const a = 10;
    return (
        <div className="xl:mx-auto xl:container">
            <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
                <div className="flex flex-col-reverse lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
                        <p className="text-sm leading-none text-gray-600 dark:text-white pb-2">
                            Featured
                        </p>
                        <p className="md:text-3xl lg:text-4xl text-2xl font-semibold lg:leading-9 text-gray-800 dark:text-white lg:pb-6 md:pb-4 pb-2">
                            Founder
                        </p>
                        <p className="text-sm leading-5 text-gray-600 dark:text-white md:pb-10 pb-8">
                            Start off the new year by hitting the ground running
                            with this purpose built workman’s bag. A culmination
                            of productivity and luxury
                        </p>
                        <div className="md:block flex items-center justify-center">
                            <Link
                                to="mailto:harshnikhilesh@gmail.com"
                                className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-gray-800 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800 dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-gray-800"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 md:py-9 py-6">
                        <img
                            src={Harsh}
                            alt="bag"
                            className="lg:w-full h-[600px] object-cover object-top w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FounderSection;
