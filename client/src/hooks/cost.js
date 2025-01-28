import { promoCodes } from "../utils/promoCodes.js";

/**
 * calculates the total cost using cart and promocode
 * @param {[object]} cart
 */
const calculateCost = (cart, code) => {
    const totalPrice = cart.reduce((accumulator, item) => {
        return (accumulator +=
            Number(item.product.price) * Number(item.quantity));
    }, 0);

    let finalPrice = totalPrice;
    let discount = 0;
    if (promoCodes.includes(code)) {
        finalPrice = totalPrice * 0.9;
        discount = totalPrice - finalPrice;
    }

    return {
        totalPrice,
        finalPrice,
        discount,
    };
};

export { calculateCost };
