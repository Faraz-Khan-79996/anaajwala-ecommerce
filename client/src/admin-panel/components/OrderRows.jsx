import React from "react";
import { format } from "date-fns";

function OrderRows({ orders, status, setOrders }) {
  orders = orders.filter((order) => order.status == status);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    // Update the status of the specific order
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };
  const handlePaymentStatusChange = (id, newStatus) => {
    // Update the status of the specific order
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, paymentStatus: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Function to get the appropriate style for each status
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400 text-white";
      case "shipped":
        return "bg-blue-400 text-white";
      case "delivered":
        return "bg-green-400 text-white";
      case "cancelled":
        return "bg-red-400 text-white";
      case "completed":
        return "bg-green-400 text-white";
      case "failed":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <tbody className="bg-white lg:border-gray-300">
      {orders &&
        orders.length > 0 &&
        orders.map((order) => (
          <>
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                {format(order.createdAt, "yyyy MMMM dd")}

                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                {order._id}
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                {order.customer_phone_no}
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                {order.customerName}
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                ${order.totalPrice}
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                {order.items.reduce(
                  (total, order) => total + order.quantity,
                  0
                )}{" "}
                kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                <select
                  className={`px-3 py-1 rounded-full cursor-pointer focus:outline-none ${getStatusStyle(
                    order.paymentStatus
                  )}`}
                  value={order.paymentStatus}
                  onChange={(e) =>
                    handlePaymentStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <select
                  className={`px-3 py-1 rounded-full cursor-pointer focus:outline-none ${getStatusStyle(
                    order.status
                  )}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </>
        ))}
    </tbody>
  );
}

export default OrderRows;
