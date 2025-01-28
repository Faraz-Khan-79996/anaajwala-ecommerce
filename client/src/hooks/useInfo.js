const useInfo = (data) => {
    const { orders, products, users } = data;
    // console.log({orders , products , users});

    const userCount = users.length;
    const orderCount = orders.length;
    const productCount = products.length;

    const deliveredOrders = orders.reduce(
        (acc, order) => (order.status === "delivered" ? acc + 1 : acc),
        0,
    );
    const cancelledOrders = orders.reduce(
        (acc, order) => (order.status === "cancelled" ? acc + 1 : acc),
        0,
    );
    const pendingOrders = orders.reduce(
        (acc, order) => (order.status === "pending" ? acc + 1 : acc),
        0,
    );

    const response = {
        userCount,
        orderCount,
        productCount,
        deliveredOrders,
        cancelledOrders,
        pendingOrders,
        orders,
        users,
        products,
    };

    // console.log(data);
    return response;
};

export { useInfo };
