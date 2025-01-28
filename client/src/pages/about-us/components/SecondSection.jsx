import React from "react";
import { useAboutUsContent } from "../../../hooks/useAboutUsContent";

function SecondSection() {
    const content = useAboutUsContent();

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-6 lg:px-20 md:py-6 md:px-6 py-9 px-4">
            {/* <p className="font-normal text-sm leading-3 text-indigo-700 dark:text-indigo-500 hover:text-indigo-800 cursor-pointer pb-2">
                About
            </p> */}
            {/* <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
                <div className="w-full lg:w-6/12">
                    <h2 className="w-full font-bold lg:text-4xl text-3xl lg:leading-10 dark:text-white leading-9">
                        We are here to make great design accessible and
                        delightfull for everyone
                    </h2>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum.In
                        the first place we have granted to God, and by this our
                        present charter confirmed for us and our heirs forever
                        that the English Church shall be free, and shall have
                        her rights entire,
                    </p>
                </div>
                <div className="w-full lg:w-6/12">
                    <img
                        className="lg:block hidden w-full"
                        src="https://i.ibb.co/RjNH7QB/Rectangle-122-1.png"
                        alt="people discussing on board"
                    />
                    <img
                        className="lg:hidden sm:block hidden w-full"
                        src="https://i.ibb.co/16fPqrg/Rectangle-122-2.png"
                        alt="people discussing on board"
                    />
                    <img
                        className="sm:hidden block w-full"
                        src="https://i.ibb.co/Jxhpxh6/Rectangle-122.png"
                        alt="people discussing on board"
                    />
                </div>
            </div> */}
            {/* <div className="relative mt-24">
                <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
                        <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg1.svg"
                            alt="flag"
                        />
                    </div>
                    <img
                        className="z-20"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg2.svg"
                        alt="note"
                    />
                    <img
                        className="z-20 sm:block hidden"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg"
                        alt="users"
                    />
                </div>
                <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
            </div> */}
            {/* <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">
                        Founded
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                    </p>
                </div>
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">
                        50M montly enrichments
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                    </p>
                </div>
                <div className="sm:block hidden">
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">
                        400k User
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                    </p>
                </div>
            </div> */}
            {/* <div className="sm:hidden block relative mt-8">
                <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg"
                        alt="user"
                    />
                </div>
                <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
            </div>
            <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">
                        400k User
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                    </p>
                </div>
            </div> */}
            <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
                <div className="w-full lg:w-6/12">
                    {/* <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
                        Our Products
                    </h2> */}

                    {/* important */}
                    <div className=" h-60 md:h-full w-full bg-slate-200 mt-5 mb-36 md:mb-10">
                        <img
                            src="https://thumbs.dreamstime.com/b/sift-flour-homemade-dough-closeup-hands-woman-who-juggles-to-sift-flour-dough-preparation-138760826.jpg"
                            alt=""
                            srcset=""
                        />
                    </div>
                </div>
                <div className="w-full lg:w-6/12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
                        {/* Team Card */}
                        <div className="flex p-4 shadow-md">
                            {/* <div className="mr-6">
                                <img
                                    className="mr-6"
                                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg4.svg"
                                    alt="team card"
                                />
                            </div> */}
                            <div className="ml-6">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                                    Diverse Range of Flours
                                </p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                    At Anajwala, we offer a diverse range of
                                    flour varieties, including whole wheat,
                                    rice, millet, and specialty flours, all
                                    sourced from trusted local farmers. We take
                                    pride in our meticulous milling process,
                                    ensuring that each batch retains its
                                    nutrients and flavor. Say goodbye to stale,
                                    store-bought flour and hello to the rich
                                    taste and health benefits of fresh flour!
                                </p>
                            </div>
                        </div>
                        {/* Board Card */}
                        <div className="flex p-4 shadow-md">
                            {/* <div className="mr-6">
                                <img
                                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg5.svg"
                                    alt="board card"
                                />
                            </div> */}
                            <div className="ml-6">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                                    Quality Assurance
                                </p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                    {content.quality_assurance}
                                </p>
                            </div>
                        </div>
                        {/* Press Card */}
                        <div className="flex p-4 shadow-md">
                            {/* <div className="mr-6">
                                <img
                                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg6.svg"
                                    alt="press card"
                                />
                            </div> */}
                            <div className="ml-6">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">
                                    Customer-Centric Service
                                </p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                    {content.your_satisfaction_our_priority}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondSection;
