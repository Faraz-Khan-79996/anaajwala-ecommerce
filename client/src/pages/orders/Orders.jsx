import React, { useEffect, useState } from "react";
import { Accordion, Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Order from "./components/Order";
import axios from "axios";
import { format } from "date-fns";
import emptyImage from "../../assets/empty-order.png";
import Loader from "../../components/Loader";

function Orders() {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/user/orders");

            const completedOrders = data.filter(
                (order) =>
                    order.status === "delivered" ||
                    order.status === "cancelled",
            );
            const pendingOrders = data.filter(
                (order) =>
                    order.status === "pending" || order.status === "shipped",
            );

            setCompletedOrders(completedOrders);
            setPendingOrders(pendingOrders);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!pendingOrders.length && !completedOrders.length) {
        return (
            <div className="h-screen flex items-center justify-center">
                {/* <h1 className="text-5xl my-auto text-center font-semibold">
                    Order List is empty!...
                </h1> */}
                <img src={emptyImage} alt="" />
            </div>
        );
    }

    return (
        <div className="p-0 md:p-20 min-h-screen">
            <Tabs aria-label="Tabs with icons" variant="fullWidth">
                <Tabs.Item active title="Your Orders" icon={HiUserCircle}>
                    <Accordion className="w-full md:w-3/4 mx-auto">
                        {pendingOrders.map((order) => (
                            <Accordion.Panel key={order._id}>
                                <Accordion.Title>
                                    {format(
                                        new Date(order.createdAt),
                                        "dd MMMM yyyy, h:mm:ss a",
                                    )}
                                </Accordion.Title>
                                <Accordion.Content className="p-1">
                                    <Order order={order} />
                                </Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </Tabs.Item>
                <Tabs.Item title="Completed Orders" icon={MdDashboard}>
                    <Accordion className="w-full md:w-3/4 mx-auto">
                        {completedOrders.map((order) => (
                            <Accordion.Panel key={order._id}>
                                <Accordion.Title>
                                    {format(
                                        new Date(order.createdAt),
                                        "dd MMMM yyyy, h:mm:ss a",
                                    )}
                                </Accordion.Title>
                                <Accordion.Content>
                                    <Order order={order} />
                                </Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </Tabs.Item>
            </Tabs>
        </div>
    );
}

export default Orders;
