import { useSelector } from "react-redux";
import { calculateCost } from "../hooks/cost";
import { FaShoppingCart } from "react-icons/fa"; // Importing a cart icon from react-icons

function CartBtn() {
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    const { finalPrice } = calculateCost(cart, "");

    return (
        <button className="flex items-center py-1 px-3 bg-violet-500 hover:bg-violet-600 text-xs text-white font-bold rounded-lg transition duration-200">
            <FaShoppingCart className="mr-2 text-xl" /> {/* Cart icon */}
            <div className="leading-tight">
                <div>₹{finalPrice} </div>
                <div className="mt-[-3px]">{cart.length} items</div>
            </div>
        </button>
    );
}

export default CartBtn;
