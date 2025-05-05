import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { endpoints } from "../../config/endpoints";

const InvoicePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.user);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(endpoints.getOrder(id));
                setOrder(res.data.order);
            } catch (err) {
                setError("Failed to fetch order. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (!currentUser) return null;
    if (loading)
        return (
            <div className="p-8 text-center text-lg">Loading invoice...</div>
        );
    if (error) return <div className="p-8 text-red-600">{error}</div>;
    if (!order) return null;

    const totalAmount = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <section className="max-w-5xl h-screen mx-auto relative">
            <button
                onClick={() => window.print()}
                className="absolute top-1 right-1 px-3 text-sm bg-gray-200 hover:bg-gray-300 shadow"
            >
                Print
            </button>

            <div className="">
                <div class="py-4">
                    <div className="py-4">
                        <div className="px-4 sm:px-14 py-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                {/* Left Section - Logo / Company Name */}
                                <div className="mx-auto sm:mx-0">
                                    {/* <img src="your-logo-url" className="h-12" /> */}
                                    <h1 className="text-2xl font-bold">
                                        Anajwala Pvt. Ltd.
                                    </h1>
                                </div>

                                {/* Right Section - Date & Invoice */}
                                <div className="text-sm flex flex-col sm:flex-row gap-4 mx-auto sm:mx-0">
                                    <div className="text-center sm:text-right sm:mx-0">
                                        <p className="whitespace-nowrap text-slate-400">
                                            Date
                                        </p>
                                        <p className="whitespace-nowrap font-bold text-main">
                                            {format(
                                                new Date(order.createdAt),
                                                "MMMM d, yyyy",
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-center sm:text-right sm:border-l pl-4">
                                        <p className="whitespace-nowrap text-slate-400">
                                            Invoice #
                                        </p>
                                        <p className="whitespace-nowrap font-bold text-main">
                                            {order._id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="bg-slate-100 px-14 py-6 text-sm">
        <table class="w-full border-collapse border-spacing-0">
          <tbody>
            <tr>
              <td class="w-1/2 align-top">
                <div class="text-sm text-neutral-600">
                  <p class="font-bold">Anajwala Pvt. Ltd.</p>
                  <p>Number: 23456789</p>
                  <p>VAT: 23456789</p>
                  <p>Start Up Cell Idea Lab, SGSITS, Park</p>
                  <p>Road, Indore, Madhya Pradesh</p>
                  <p>India</p>
                </div>
              </td>
              <td class="w-1/2 align-top text-right">
                <div class="text-sm text-neutral-600">
                  <p class="font-bold">Customer Details</p>

                  <p>Customer Name : {order.customerName}</p>
                  <p>Customer Phone : {order.customer_phone_no}</p>
                  <p>Customer ID : {order.customerId}</p>
                  <p>Order Date : {format(new Date(order.createdAt), "MMMM d, yyyy")}</p>
                  <p><address>{order.address}</address></p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

                    <div class="bg-slate-100 px-14 py-6 text-sm">
                        <section class="w-full border-collapse border-spacing-0 flex flex-col items-center sm:flex-row space-y-4 sm:justify-between sm:space-y-0">
                            <div class="">
                                <div class="text-sm text-neutral-600 text-center sm:text-left">
                                    <p class="font-bold">Anajwala Pvt. Ltd.</p>
                                    <p>Number: 23456789</p>
                                    <p>VAT: 23456789</p>
                                    <p>Start Up Cell Idea Lab, SGSITS, Park</p>
                                    <p>Road, Indore, Madhya Pradesh</p>
                                    <p>India</p>
                                </div>
                            </div>
                            <div class="sm:text-right text-center">
                                <div class="text-sm text-neutral-600">
                                    <p class="font-bold">Customer Details</p>

                                    <p>Customer Name : {order.customerName}</p>
                                    <p>
                                        Customer Phone :{" "}
                                        {order.customer_phone_no}
                                    </p>
                                    <p>Customer ID : {order.customerId}</p>
                                    <p>
                                        Order Date :{" "}
                                        {format(
                                            new Date(order.createdAt),
                                            "MMMM d, yyyy",
                                        )}
                                    </p>
                                    <p>
                                        <address>{order.address}</address>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="px-2 sm:px-14 pt-10 text-sm text-neutral-700">
                        <table class="w-full border-collapse border-spacing-0 mx-auto sm:mx-0">
                            <thead>
                                <tr>
                                    <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">
                                        #
                                    </td>
                                    <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">
                                        Product details
                                    </td>
                                    <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                                        Price
                                    </td>
                                    <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                                        Qty.
                                    </td>
                                    {/* <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">VAT</td> */}
                                    <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                                        Subtotal
                                    </td>
                                    <td class="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">
                                        Total
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr className="text-[13px]">
                                        <td class="border-b py-3 pl-3">
                                            {index + 1}.
                                        </td>
                                        <td class="border-b py-3 pl-2 max-w-[150px] break-words whitespace-normal">
                                            {item.productName}
                                        </td>
                                        <td class="border-b py-3 pl-2 text-right">
                                            ₹
                                            {(
                                                item.price / item.quantity
                                            ).toFixed(2)}
                                        </td>
                                        <td class="border-b py-3 pl-2 text-center">
                                            {item.quantity}
                                        </td>
                                        {/* <td class="border-b py-3 pl-2 text-center">20%</td> */}
                                        <td class="border-b py-3 pl-2 text-right">
                                            ₹{item.price.toFixed(2)}
                                        </td>
                                        <td class="border-b py-3 pl-2 pr-3 text-right">
                                            ₹{item.price.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colspan="7">
                                        <table class="w-full border-collapse border-spacing-0">
                                            <tbody>
                                                <tr>
                                                    <td class="w-full"></td>
                                                    <td>
                                                        <table class="w-full border-collapse border-spacing-0">
                                                            <tbody>
                                                                {/* <tr>
                              <td class="border-b p-3">
                                <div class="whitespace-nowrap text-slate-400">Net total:</div>
                              </td>
                              <td class="border-b p-3 text-right">
                                <div class="whitespace-nowrap font-bold text-main">₹{order.totalPrice.toFixed(2)}</div>
                              </td>
                            </tr> */}
                                                                {/* <tr>
                              <td class="p-3">
                                <div class="whitespace-nowrap text-slate-400">VAT total:</div>
                              </td>
                              <td class="p-3 text-right">
                                <div class="whitespace-nowrap font-bold text-main">₹64.00</div>
                              </td>
                            </tr> */}
                                                                <tr>
                                                                    <td class="bg-main p-3">
                                                                        <div class="whitespace-nowrap font-bold">
                                                                            Total:
                                                                        </div>
                                                                    </td>
                                                                    <td class="bg-main p-3 text-right">
                                                                        <div class="whitespace-nowrap font-bold">
                                                                            ₹
                                                                            {order.totalPrice.toFixed(
                                                                                2,
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
{/* 
                    <section className="flex justify-between bg-slate-100 py-6">
                        <div class="px-14 text-sm text-neutral-700">
                            <p class="text-main font-bold">PAYMENT DETAILS</p>
                            <p>Payment method: {order.paymentMethod}</p>
                            <p>Payment status: {order.paymentStatus}</p>
                        </div>
                        <div class="px-14 text-sm text-neutral-700">
                            <p class="text-main font-bold">
                                Manufacturing Details
                            </p>
                            <p>
                                Manufacturing Date:{" "}
                                {format(
                                    new Date(order.createdAt),
                                    "MMMM d, yyyy",
                                )}
                            </p>
                            <p>
                                Manufacturing Time:{" "}
                                {format(new Date(order.createdAt), "hh:mm a")}
                            </p>
                        </div>
                    </section>
 */}


<div class="bg-slate-100 px-14 py-6 text-sm">
                        <section class="w-full border-collapse border-spacing-0 flex flex-col items-center sm:flex-row space-y-4 sm:justify-between sm:space-y-0">
                            <div class="">
                                <div class="text-sm text-neutral-600 text-center sm:text-left">
                                <p class="text-main font-bold">PAYMENT DETAILS</p>
                            <p>Payment method: {order.paymentMethod}</p>
                            <p>Payment status: {order.paymentStatus}</p>
                                </div>
                            </div>
                            <div class="sm:text-right text-center">
                                <div class="text-sm text-neutral-600">
                                <p class="text-main font-bold">
                                Manufacturing Details
                            </p>
                            <p>
                                Manufacturing Date:{" "}
                                {format(
                                    new Date(order.createdAt),
                                    "MMMM d, yyyy",
                                )}
                            </p>
                            <p>
                                Manufacturing Time:{" "}
                                {format(new Date(order.createdAt), "hh:mm a")}
                            </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="px-14 py-10 text-sm text-neutral-700 pb-6">
                        <p class="text-main font-bold">Notes</p>
                        <p class="italic">
                            Thank you for your purchase. Please verify all items
                            listed above. In case of any discrepancies. We are
                            not responsible for any damages or losses occurring
                            after delivery confirmation. All sales are final
                            unless stated otherwise. This invoice serves as
                            proof of purchase and must be retained for any
                            future correspondence.
                        </p>
                    </div>
                    

                    <footer class="relative bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
                        Anajwala pvt. ltd. &copy; 2025
                        <span class="text-slate-300 px-2">|</span>
                        anajwalaproducts@gmail.com
                        <span class="text-slate-300 px-2">|</span>
                        +91 8889990352 , +91 8889990358
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default InvoicePage;
