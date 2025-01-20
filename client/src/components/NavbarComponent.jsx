import { Navbar, Drawer } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../features/user/userSlice.js";
import { useState } from "react";
import CartDrawer from "./CartDrawer.jsx";
// import CartDrawerContent from "./CartDrawerContent.jsx";
// import Logo from "../assets/logo.png";
import Logo from "../assets/NavbarLogo2.jpeg";
import CartBtn from "./CartBtn.jsx";
import { Avatar } from "flowbite-react";
import { useCartContext } from "../context/CartContext.jsx";
import { HiOutlineUser } from "react-icons/hi2";
// import { CiShoppingCart } from "react-icons/ci";
import {motion} from "framer-motion";
import "@fontsource/fredoka"; // Defaults to weight 400


export default function NavbarComponent() {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(currentUser);

  const { isOpen, setIsOpen } = useCartContext();

  return (
    <>
      <div className="w-full overflow-hidden bg-[#4c056f] text-white flex justify-center items-center border-2">
      {/* <motion.div
        className="w-max bg-[#4c056f] text-white flex justify-center items-center text-xs font-fredoka"
        animate={{
          x: ["100%", "-20%"], // Move from right to left
        }}
        transition={{
          repeat: Infinity, // Repeat infinitely
          duration: 30, // Adjust speed of the animation
          ease: "linear", // Smooth continuous movement
        }}
      >
        <span className="mr-36 font-bold tracking-wide m-2 font-fredoka">
          Delivering freshness at your door step!
        </span>
        <span className="mr-36 font-bold tracking-wide font-fredoka">
          Shop now on anaajwala and enjoy 10% off with code <span className="text-yellow-400">XYZ123</span>
        </span>
      </motion.div> */}
    </div>
      <div className="sticky top-0 z-20 py-1 bg-white shadow-sm border-b-[1px] border-[#e2e0de] font-fredoka">
        <Navbar fluid rounded>
          <Navbar.Brand>
            {/* <img
          src="/react.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
            <Link to="/">
              {/* <span className="self-center whitespace-nowrap text-purple-600 text-2xl font-extrabold dark:text-white">
                            Anaajwala
                        </span> */}
              <img
                src={Logo}
                alt=""
                className="h-10 rounded-md md:h-14 md:rounded-xl"
              />
            </Link>
          </Navbar.Brand>

          <div className="flex md:order-2">
            {currentUser.user ? (
              <Link to="/user/profile">
                {/* <h4 className="text-xl font-bold italic mr-6">
                                @{currentUser.user.username}
                            </h4> */}
                <Avatar
                  img={currentUser.user.avatar}
                  alt="avatar of user"
                  className="mr-4"
                  size={"md"}
                  rounded
                />
              </Link>
            ) : (
              <>
                {/* <Link to="/login">
                  <span className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
                    Sign In
                  </span>
                </Link> */}
                <Link to="/signup">
                  <span className="hidden lg:inline-block p-2 text-white font-bold transition duration-200 rounded-full bg-gray-200">
                    <HiOutlineUser className="text-black text-2xl text-bold" />
                  </span>
                </Link>
              </>
            )}
            {currentUser.user ? (
              <>
                {/* <Button
                                className="bg-fuchsia-900"
                                onClick={() => dispatch(signoutUser())}
                            >
                                Logout
                            </Button> */}

                <button
                  className="hidden lg:inline-block py-2 px-1 bg-red-500 hover:bg-red-700 text-sm text-white font-bold rounded-xl transition duration-200"
                  onClick={() => dispatch(signoutUser())}
                >
                  Sign Out
                </button>
              </>
            ) : null}
            <div
              className="ml-2 mr-2 hidden md:block md:mr-0"
              onClick={() => setIsOpen(true)}
            >
              <CartBtn />
            </div>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link onClick={() => navigate("/")}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                    : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/"
              >
                Home
              </NavLink>
            </Navbar.Link>
            <Navbar.Link onClick={() => navigate("/products")}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/products"
              >
                Products
              </NavLink>
            </Navbar.Link>
            <Navbar.Link onClick={() => navigate("/about-us")}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                    : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/about-us"
              >
                Our Story
              </NavLink>
            </Navbar.Link>
            {/* <Navbar.Link onClick={() => setIsOpen(true)} style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                            className={`
                                ${
                                    isOpen
                                        ? "text-blue-600 font-bold"
                                        : "text-gray-600 font-extrabold"
                                } cursor-pointer`}
                            style={{ marginRight: '8px' }} // Adjust the margin as needed
                        >
                            My Cart
                        </span>
                        <span className="ml-2 mr-2 md:hidden md:mr-0">
                            <CartBtn />
                        </span>
                    </Navbar.Link> */}
            <Navbar.Link onClick={() => navigate("/user/orders")}>
              {" "}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                    : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/user/orders"
              >
                Orders
              </NavLink>
            </Navbar.Link>
            <Navbar.Link onClick={() => navigate("/bulk-order")}>
              {" "}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                    : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/bulk-order"
              >
                Bulk-orders
              </NavLink>
            </Navbar.Link>
            <Navbar.Link onClick={() => navigate("/contact-us")}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-[#510876] font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 after:hover:origin-left py-1"
                    : "text-gray-600 font-bold text-[16px] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#510876] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 after:hover:origin-left py-1"
                }
                to="/contact-us"
              >
                Customer support
              </NavLink>
            </Navbar.Link>

            {/* {currentUser.user && (
                        <Navbar.Link>
                            <NavLink
                                className={
                                    ({ isActive }) =>
                                        isActive
                                            ? "text-blue-600 font-bold" // Active link styling
                                            : "text-gray-600 font-extrabold" // Inactive link styling
                                }
                                to="/user/profile"
                            >
                                Update-Profile
                            </NavLink>
                        </Navbar.Link>
                    )} */}

            <Navbar.Link className="md:hidden">
              {" "}
              {currentUser.user ? (
                <>
                  {" "}
                  <button
                    className="lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-700 text-sm text-white font-bold rounded-xl transition duration-200"
                    onClick={() => dispatch(signoutUser())}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="p-1">
                  <Link to="/login">
                    <span className="lg:inline-block mr-2 lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
                      Sign In
                    </span>
                  </Link>
                  <Link to="/signup">
                    <span className="lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
                      Sign up
                    </span>
                  </Link>
                </div>
              )}
            </Navbar.Link>

            {/* <Navbar.Link><NavLink to="/admin">admin Panel</NavLink></Navbar.Link> */}
          </Navbar.Collapse>
        </Navbar>

        {/* <Drawer
                open={isOpen}
                onClose={handleClose}
                position="right"
                className="w-80 p-2 md:w-80 overflow-hidden"
            >
                <Drawer.Header title="Cart" />
                <Drawer.Items>
                    <CartDrawerContent />
                </Drawer.Items>
            </Drawer> */}

        {/* <Drawer open={isOpen} onClose={handleClose} position="right">
                <Drawer.Header title="Drawer" />
                <Drawer.Items>
                    <CartDrawerContent handleClose={handleClose} />
                </Drawer.Items>
            </Drawer> */}
        <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
