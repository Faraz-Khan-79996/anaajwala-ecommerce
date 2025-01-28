import { Drawer } from "flowbite-react";

// import { useState } from "react";
import CartDrawerContent from "./CartDrawerContent";
import { useCartContext } from "../context/CartContext";
function CartDrawer() {
    const { isOpen, setIsOpen } = useCartContext();
    const handleClose = () => setIsOpen(false);

    return (
        <Drawer open={isOpen} onClose={handleClose} position="right">
            <Drawer.Header title="Drawer" />
            <Drawer.Items>
                <CartDrawerContent handleClose={handleClose} />
            </Drawer.Items>
        </Drawer>
    );
}

export default CartDrawer;
