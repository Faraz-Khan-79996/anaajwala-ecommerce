import React from "react";
import Page2 from "../../admin-panel/Page2";
import { Link } from "react-router-dom";

function ContactUs() {
    return (
        <div className="container mx-auto pt-10">
            <div className="lg:flex">
                <div className="xl:w-2/5 lg:w-2/5 bg-indigo-700 py-16 rounded-tl-3xl font-fredoka">
                    <div className="xl:w-5/6 xl:px-0 px-8 mx-auto">
                        <h1 className="xl:text-4xl text-3xl pb-4 text-white font-bold">
                            Get in touch
                        </h1>
                        <p className="text-xl text-white pb-8 leading-relaxed font-normal lg:pr-4">
                            Got a question about us? Are you interested in
                            partnering with us? Have some suggestions or just
                            want to say Hi? Just contact us. We are here to
                            asset you.
                        </p>
                        <div className="flex pb-4 items-center">
                            <div aria-label="phone icon" role="img">
                                <img
                                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/contact_indigo-svg1.svg"
                                    alt="phone"
                                />
                            </div>
                            <p className="pl-4 text-white text-base">
                                +91 8889990352,
                            </p>
                            <p className="pl-4 text-white text-base">
                                +91 8889990358
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div aria-label="email icon" role="img">
                                <img
                                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/contact_indigo-svg2.svg"
                                    alt="email"
                                />
                            </div>
                            <Link
                                to="mailto:anajwalaproducts@gmail.com"
                                className="pl-4 text-white text-base"
                            >
                                anajwalaproducts@gmail.com
                            </Link>
                        </div>
                        <p className="text-lg text-white pt-10 tracking-wide">
                            Start Up Cell Idea Lab , Sgsits, Park Road,
                            <br />
                            Indore(M.P)
                        </p>
                        {/* <div className=" pt-16">
                            <a
                                href="javascript:void(0)"
                                className="text-white font-bold tracking-wide underline focus:outline-none focus:ring-2 focus:ring-white "
                            >
                                View Job Openings
                            </a>
                        </div> */}
                    </div>
                </div>
                <div className="xl:w-3/5 lg:w-3/5 bg-gray-200 dark:bg-gray-600 h-full rounded-tr-3xl">
                    <Page2 />
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
