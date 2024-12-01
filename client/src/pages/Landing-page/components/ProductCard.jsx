import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../../features/cart/CartSlice";
import { useDispatch  } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductCard({ item }) {

  const dispatch = useDispatch()
  

  const notify = () => toast.success("Added to cart!" , {autoClose : 800 , position: "bottom-right",theme: "dark",});
  const handleAddToCart = ()=>{

    try {
      
      dispatch(addToCart({
        id : item._id,
        product : item,
        quantity : 1,
      }))
      notify()      
    } catch (error) {
      console.log(error);
      
    }

  }


  return (
    <>
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
    <ToastContainer />
        <a href="#" />
        <div className="relative">
          <Link to={`/product/${item._id}`}>
            <img
              className="w-full h-48 object-cover"
              src={item.thumbnail}
              alt=".."
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          </Link>
          <a href="#!">
            <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
              {item.category}
            </div>
          </a>
        </div>
        <div className="px-6 py-4 mb-auto">
          <Link
            to={`/product/${item._id}`}
            className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {item.name}
          </Link>
          <p className="text-gray-500 text-sm">
            {item.description}
          </p>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span
            href="#"
            className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            {/* <svg
              height="13px"
              width="13px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </g>
              </g>
            </svg> */}
            <span className="ml-1 line-through font-semibold text-lg">₹{item.MRP}</span>
            <span className="ml-3 font-semibold text-lg">₹{item.price} <span className="text-sm font-light"></span></span>
          </span>
          {/* <span
            href="#"
            className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              className="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span className="ml-1">39 Comments</span>
          </span> */}
          <button 
            onClick={handleAddToCart}
          className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
            Add 
          </button>
          
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <Link to={`/product/${item._id}`}>
        <img
          className="w-full h-56 object-cover hover:grow hover:shadow-lg"
          src={item.thumbnail}
          alt={item.name}
        />
        <div className="pt-3 flex items-center justify-between">
          <p className="">{item.name}</p>
          {/* <svg
        className="h-6 w-6 fill-current text-gray-500 hover:text-black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
      </svg> */}
        </div>
        <p className="pt-1 text-gray-900">
          {/* ₹{item.price["gold"]} /Kg - ₹{item.price["diamond"]} /Kg */}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
