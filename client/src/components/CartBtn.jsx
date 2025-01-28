import { useSelector } from "react-redux";
import { calculateCost } from "../hooks/cost";
import { IoCartOutline } from "react-icons/io5";

function CartBtn() {
    const cart = useSelector((state) => state.cart);
    // console.log(cart);

    const { finalPrice } = calculateCost(cart, "");

    return (
        <button className="flex items-center py-1 px-1 h-10 bg-transparent text-xs text-white font-bold rounded-lg transition duration-200 font-fredoka">
            <IoCartOutline className="mr-2 text-3xl text-black" />{" "}
            {/* Cart icon */}
            <div className="leading-tight flex flex-col items-start text-black">
                {/* <div>₹{finalPrice} </div> */}
                <div className="relative -top-3 -left-3 rounded-full bg-red-600 px-[6px] py-[2px] text-white">
                    <div>{cart.length}</div>
                </div>
            </div>
        </button>
    );
}

export default CartBtn;
