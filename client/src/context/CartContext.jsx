import { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Provide the context to your application
export const CartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <CartContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
