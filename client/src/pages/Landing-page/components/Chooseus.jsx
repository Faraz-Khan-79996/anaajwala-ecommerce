import React from "react";
import { motion } from "framer-motion";

function Chooseus() {
    const animationConfig = {
        initial: { x: 0, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { ease: "anticipate", duration: 0.6 },
    };

    return (
        <>
            <section className="text-gray-700 body-font mt-10 font-fredoka overflow-hidden">
                <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
                    Why Anajwala?
                </div>
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-wrap text-center justify-center">
                        {[
                            {
                                src: "https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp",
                                title: "Freshly Prepared",
                            },
                            {
                                src: "https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp",
                                title: "Reasonable Rates",
                            },
                            {
                                src: "https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp",
                                title: "Time Efficiency",
                            },
                            {
                                src: "https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp",
                                title: "100% Nutritional Assurance",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                {...animationConfig}
                                initial={{
                                    x: index % 2 === 0 ? -100 : 100,
                                    opacity: 0,
                                }}
                                className="p-4 md:w-1/4 sm:w-1/2"
                            >
                                <div className="px-4 py-6 transform transition duration-500 hover:scale-110 hover:opacity-90 hover:shadow-lg">
                                    <div className="flex justify-center">
                                        <img
                                            src={item.src}
                                            className="w-32 mb-3"
                                            alt={item.title}
                                        />
                                    </div>
                                    <h2 className="title-font font-regular text-2xl text-gray-900">
                                        {item.title}
                                    </h2>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Chooseus;
