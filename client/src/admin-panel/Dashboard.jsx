import React from "react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { AiOutlineMenu } from "react-icons/ai";
import SideBarContent from "./SideBarContent";

import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import EditProduct from "./components/sub-pages/EditProduct";

import { Outlet } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const navigate = useNavigate();

    // useEffect(() => {

    //   if(location.search == ''){
    //       navigate('/admin?tab=home')
    //   }

    //   const urlParams = new URLSearchParams(location.search);
    //   const tabFromUrl = urlParams.get("tab");
    //   if (tabFromUrl) {
    //     setTab(tabFromUrl);
    //   }
    // }, [location.search]);
    return (
        <div className="">
            <Button onClick={() => setIsOpen(true)} className="m-4 mb-0">
                <AiOutlineMenu className="h-6 w-6" />
            </Button>
            <SideBarContent isOpen={isOpen} handleClose={handleClose} />

            {/* profile... */}
            {/* {tab === "home" && <Home />} */}
            {/* {tab === "page1" && <Page1 />} */}
            {/* posts... */}
            {/* {tab === "page2" && <Page2 />} */}
            {/* users */}
            {/* {tab === 'page3' && <Page3 />} */}
            {/* user's bookings  */}
            {/* {tab === 'my-bookings' && <UserBookings />} */}
            {/* received bookings */}
            {/* {tab === 'received-bookings' && <ReceivedBooking />} */}
            <Outlet />
        </div>
    );
}

export default Dashboard;
