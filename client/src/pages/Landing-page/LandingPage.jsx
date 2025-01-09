// import React from "react";
// import NavbarComponent from "../../components/NavbarComponent";
import { Carousel } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import image1 from "../../assets/image1.jpg";
// import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import Chooseus from "./components/Chooseus";
// import Harsh1 from "../../assets/Harsh1.jpg"
import Testimonial from "./components/Testimonial";
import HeroGrid from "./components/HeroGrid";
import Loader from "../../components/Loader";
import useFetchProducts from "../../hooks/useFetchProducts"
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function LandingPage() {

  const {products , loading , error} = useFetchProducts()

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div><ToastContainer /></div>
      {/* <div className="xl:h-[30rem] 2xl:h-[36rem]"> */}
        {/* <Carousel className="h-[500px] md:h-[600px]" slideInterval={3000}> */}
          {/* <img className="h-full" src={image1} alt="..." /> */}
          {/* <img
            
            src={banner4}
            alt="..."
          />
          <img
            src={banner3}
            alt="..."
          /> */}
        {/* </Carousel> */}
      {/* </div> */}

        <HeroGrid />
        {/* <div className="h-[80vh] bg-no-repeat bg-right" style={{ backgroundImage:`url(https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700355803.jpg)` }}>
          <div className="w-full h-full border-white flex items-center justify-center lg:justify-start">
            <div className="text-white mb-16 font-mono text-4xl md:ml-40  text-center lg:text-start">
              <h2 className="text-6xl font-mono italic mb-6 font-semibold">Anajwala Products</h2>
              <p className="italic text-xl font-light">Delivering freshness to your doorstep</p>
            <div className=" mt-10 text-lg">
              <Link to={`/products`} className="hover:bg-white py-2 hover:text-black border rounded-full transition duration-300 italic font-extralight px-16"> Let's Shop!</Link>
            </div>
            </div>
          </div>
        </div> */}

      {/*	 
  
  Alternatively if you want to just have a single hero
  
  <section class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right" style="max-width:1600px; height: 32rem; background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');">
  
    <div class="container mx-auto">
  
      <div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
        <h1 class="text-black text-2xl my-4">Stripy Zig Zag Jigsaw Pillow and Duvet Set</h1>
        <a class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">products</a>
  
      </div>
  
      </div>
  
  </section>
  
  */}
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full  top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <span
                className="italic tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              >
                Delivering freshness to your doorstep
              </span>
              <div className="flex items-center" id="store-nav-content">
                {/* <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a> */}
                {/* <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </nav>
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div className="border-b mb-5 flex justify-between text-sm">
              <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                <svg
                  className="h-6 mr-3"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 455.005 455.005"
                  style={{ enableBackground: "new 0 0 455.005 455.005" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z">
                      {" "}
                    </path>
                    <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z">
                      {" "}
                    </path>
                    <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z">
                      {" "}
                    </path>
                    <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z">
                      {" "}
                    </path>
                    <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z">
                      {" "}
                    </path>
                    <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z">
                      {" "}
                    </path>
                    <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z">
                      {" "}
                    </path>
                  </g>
                </svg>
                <a href="#" className="font-semibold inline-block">
                  Our Products
                </a>
              </div>
              <a href="#">See All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {/* CARD 1 */}

              {products &&
                products.length > 0 &&
                products.map((item) => (
                  <div key={item._id}>
                    <ProductCard item={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Chooseus/>

      <Testimonial />

    </>
  );
}

export default LandingPage;
