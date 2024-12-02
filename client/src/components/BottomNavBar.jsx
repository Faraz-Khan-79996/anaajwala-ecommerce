import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiBox, FiShoppingCart, FiClipboard } from "react-icons/fi";
import { useCartContext } from "../context/CartContext";
import { Badge } from "flowbite-react";
import { useSelector } from "react-redux";

const BottomNavBar = () => {
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { isOpen, setIsOpen } = useCartContext();
    const location = useLocation();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    // Hardcoded cart item count for demonstration
    const cartItemCount = cart.length;

    // Handle scroll direction
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setShowNav(false); // Scrolling down
        } else {
            setShowNav(true); // Scrolling up
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Navigation tabs with links
    const tabs = [
        {
            id: "home",
            icon: <AiOutlineHome size={20} />,
            label: "Home",
            link: "/",
        },
        {
            id: "products",
            icon: <FiBox size={20} />,
            label: "Products",
            link: "/products",
        },
        {
            id: "cart",
            icon: <FiShoppingCart size={20} />,
            label: "Cart",
            link: "/user/cart",
        },
        {
            id: "orders",
            icon: <FiClipboard size={20} />,
            label: "Orders",
            link: "/user/orders",
        },
    ];

    // Get active tab based on current URL
    const activeTab =
        tabs.find((tab) => tab.link === location.pathname)?.id || null;

    function handleNavigate(tab) {
            if (tab.id === "cart") setIsOpen(!isOpen);
            else{
                setIsOpen(false);
                navigate(tab.link);
            } 
    }

    return (
        <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg border rounded-t-xl z-50 transition-transform duration-300 md:hidden ${
                showNav ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="flex justify-around items-center py-2">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className="relative flex flex-col items-center"
                    >
                        {/* Badge for cart tab */}
                        {tab.id === "cart" && (
                            <Badge className="absolute top-2 right-1 bg-red-600 p-2 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center transform translate-x-2 -translate-y-2">
                                {cartItemCount}
                            </Badge>
                        )}
                        <button
                            className={`flex flex-col items-center p-2 pb-1 rounded-lg ${
                                activeTab === tab.id
                                    ? "text-purple-600"
                                    : "text-gray-500 hover:text-purple-600"
                            }`}
                            onClick={()=> handleNavigate(tab)}
                        >
                            {tab.icon}
                        </button>
                        <div className={`text-[10px] font-varela font-semibold mt-0 ${
                                activeTab === tab.id
                                    ? "text-purple-600"
                                    : "text-gray-500 "
                            }`}
                            onClick={()=> handleNavigate(tab)}>{tab.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomNavBar;
