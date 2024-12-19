import React from "react";

import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { signoutUser } from "../features/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

function SideBarContent({ isOpen, handleClose }) {
  // const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(signoutUser())
    navigate('/')
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Link to="/admin">
                      <Sidebar.Item icon={HiInformationCircle}>Home</Sidebar.Item>
                    </Link>
                    <Link to="/admin/orders">
                      <Sidebar.Item icon={HiChartPie}>Order Tracker</Sidebar.Item>
                    </Link>
                    <Link to="/admin/customer-data-form">
                      <Sidebar.Item icon={HiShoppingBag}>
                        Customer Data Form
                      </Sidebar.Item>
                    </Link>
                    <Link to="/admin/products">
                      <Sidebar.Item icon={HiUsers}>Products</Sidebar.Item>
                    </Link>
                    {/* <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                    >
                      Sign up
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Link to={`/admin/product/create`}>
                      <Sidebar.Item icon={HiClipboard}>
                        Create Product
                      </Sidebar.Item>
                    </Link>
                    {/* <Link to={``}>
                    <Sidebar.Item
                      icon={HiCollection}
                    >
                      Receieved Bookings
                    </Sidebar.Item>
                    </Link> */}
                    <Button
                      onClick={handleSignOut}
                      className="w-full"
                      gradientMonochrome="failure"
                    >
                      {" "}
                      <HiOutlineArrowLeft className="mr-2 h-5 w-5" /> Log Out
                    </Button>
                    <Button
                      onClick={()=>navigate('/')}
                      className="w-full"
                      gradientMonochrome="success"
                    >
                      {" "}
                      <HiOutlineArrowLeft className="mr-2 h-5 w-5" /> Back
                    </Button>                    
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

export default SideBarContent;