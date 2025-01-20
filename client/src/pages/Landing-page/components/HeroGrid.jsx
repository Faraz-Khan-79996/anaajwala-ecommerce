import React from "react";
import { Carousel } from "flowbite-react";
import ReadMore from "../../../components/ReadMore ";
import c5 from '../../../assets/landing-images/c5.png'
import c2 from '../../../assets/landing-images/c2.jpg'
import c3 from '../../../assets/landing-images/c3.jpg'
import c4 from '../../../assets/landing-images/c4.jpg'
import b10 from '../../../assets/landing-images/b10.jpg'
import g1 from '../../../assets/landing-images/g1.jpg'
import g2 from '../../../assets/landing-images/g2.jpg'
import g3 from '../../../assets/landing-images/g3.jpg'
import g4 from '../../../assets/landing-images/g4.jpg'
import m1 from '../../../assets/landing-images/m1.jpg'
import b7 from '../../../assets/landing-images/r1.avif'
import logo from '../../../assets/footerLogo.png'
import imgLogo from '../../../assets/landing-images/img-logo.png'


function HeroGrid() {
    return (
        <div className="">
            <div className="container mx-auto px-4 py-8">
            <ReadMore>
                {/* <h1 className="text-4xl font-bold text-center mb-8">
      Bento Grid Layout with Images
    </h1> */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Large item */}
                    <div className="md:col-span-2 col-span-1 md:row-span-2 relative overflow-hidden rounded-2xl group">
                        {/* <img
                            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080"
                            alt="Nature"
                            className="w-full h-full object-cover"
                        />
                         */}

                        <div className="h-64 md:h-full">
                        {/* <Carousel slideInterval={3000} className="w-full h-full border-2 border-red-600"> */}
                            {/* <img src={image1} alt="..." /> */}
                            <img
                                // src={banner4}
                                className="w-full h-full object-cover"
                                src={
                                    m1
                                }
                                alt="..."
                            />

                            {/* <img
                                src={
                                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080"
                                }
                                alt="..."
                            />
                            <img
                                src={
                                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080"
                                }
                                alt="..."
                            />
                            <img
                                src={
                                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080"
                                }
                                alt="..."
                            /> */}
                        {/* </Carousel> */}
                        </div>                          
                        {/* <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-2xl font-bold text-white">
                                    Explore Nature
                                </h3>
                                <p className="text-white">
                                    Discover the beauty of the natural world
                                </p>
                            </div>
                        </div> */}
                    </div>
                    {/* Two small items */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={c5}
                            alt="Food"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Culinary Delights
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={c4}
                            alt="Technology"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Tech Innovations
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    {/* Three medium items */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={g2}
                            alt="Travel"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Travel Adventures
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={c3}
                            alt="Art"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Artistic Expressions
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    {/* bottom cards */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={g4}
                            alt="Sport"
                            className="w-full h-48 object-contain object-center"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Swimming
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={c2}
                            alt="Sport"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Chess
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={b7}
                            alt="Sport"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Football
                                </h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                        <img
                            src={b10}
                            alt="Sport"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* <h4 className="text-xl font-bold text-white">
                                    Cricket
                                </h4> */}
                            </div>
                        </div>
                    </div>
                </div>
            </ReadMore>
            </div>
        </div>
    );
}

export default HeroGrid;
