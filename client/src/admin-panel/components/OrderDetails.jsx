import React, { useState } from "react";
import { Button, Modal, Select } from "flowbite-react";

const OrderDetails = ({ order }) => {
    const [openModal, setOpenModal] = useState(false);

    if (!order) {
        return <p>No order</p>;
    }

    return (
        <>
            <Modal
                show={openModal}
                size={"7xl"}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Info</Modal.Header>
                <Modal.Body>
                    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Order Details
                        </h2>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">
                                Customer Information
                            </h3>
                            <p>
                                <strong>Order Through:</strong>{" "}
                                <span className="border py-1 px-2 rounded-lg bg-blue-100">
                                    {order.orderThrough
                                        ? order.orderThrough
                                        : "website"}
                                </span>
                            </p>
                            <p>
                                <strong>Name:</strong> {order.customerName}
                            </p>
                            <p>
                                <strong>Phone:</strong>{" "}
                                {order.customer_phone_no}
                            </p>

                            {/* Highlighted Address Section */}
                            <div className="p-4 mt-2 border border-blue-500 rounded bg-blue-50">
                                <p className="text-lg font-bold text-blue-700">
                                    <strong>Address:</strong> {order.address}
                                </p>
                                <p className="text-lg font-bold text-blue-700">
                                    <strong>Pincode:</strong> {order.pincode}
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">
                                Order Information
                            </h3>
                            <p>
                                <strong>Order ID:</strong> {order._id}
                            </p>
                            {/* <p>
                <strong>Product ID:</strong> {order.productId}
              </p> */}
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`text-${
                                        order.status === "pending"
                                            ? "yellow-500"
                                            : "green-500"
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{" "}
                                {order.paymentMethod}
                            </p>
                            <p>
                                <strong>Payment Status:</strong>{" "}
                                {order.paymentStatus}
                            </p>
                            <p>
                                <strong>
                                    Total Price {"(After Discount)"}:
                                </strong>{" "}
                                ₹{order.totalPrice.toFixed(2)}
                            </p>
                            <p>
                                <strong>Delivery Date:</strong>{" "}
                                {order.deliveryDate
                                    ? order.deliveryDate
                                    : "Not set"}
                            </p>
                            <p>
                                <strong>Order Notes:</strong> {order.orderNotes}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Items</h3>
                            <ul>
                                {order.items.map((item) => (
                                    <li
                                        key={item._id}
                                        className="mb-2 p-2 border rounded"
                                    >
                                        <p>
                                            <strong>Product ID:</strong>{" "}
                                            {item.productId}
                                        </p>
                                        <p>
                                            <strong>Product Name:</strong>{" "}
                                            {item.productName}
                                        </p>
                                        <p>
                                            <strong>Texture:</strong>{" "}
                                            <span className="text-blue-700 font-mono italic font-semibold">
                                                {item.texture}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Type:</strong> {item.type}
                                        </p>
                                        <p>
                                            <strong>Quantity:</strong>{" "}
                                            {item.quantity}
                                        </p>
                                        <p>
                                            <strong>Price {"(total)"}:</strong>{" "}
                                            ₹{item.price.toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">
                                <strong>Created At:</strong>{" "}
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Updated At:</strong>{" "}
                                {new Date(order.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Button onClick={() => setOpenModal(true)} color="blue">
                i
            </Button>
        </>
    );
};

export default OrderDetails;
