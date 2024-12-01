import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import BottomNavBar from "./BottomNavBar";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

function Layout() {
  return (
    <>
    <CartProvider>
      <NavbarComponent />
      <CartDrawer />
      <Outlet />
      <BottomNavBar />
      <Footer/>
    </CartProvider>
    </>
  );
}

export default Layout;
