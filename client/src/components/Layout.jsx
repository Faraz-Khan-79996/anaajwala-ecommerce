import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import BottomNavBar from "./BottomNavBar";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { ToastContainer, toast } from "react-toastify";

function Layout() {
    return (
        <>
            <CartProvider>
                <NavbarComponent />
                <CartDrawer />
                <ToastContainer />
                <Outlet />
                <BottomNavBar />
                <Footer />
            </CartProvider>
        </>
    );
}

export default Layout;
