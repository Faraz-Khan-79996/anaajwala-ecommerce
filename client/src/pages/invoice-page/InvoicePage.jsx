import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.user);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        setError('Failed to fetch order. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (!currentUser) return null;
  if (loading) return <div className="p-8 text-center text-lg">Loading invoice...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!order) return null;

  const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 pt-0 bg-white shadow-lg mt-4 print:px-0 print:shadow-none">
      <div className="print-section">
        {/* Company Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center space-x-4">
            <img
              src="/favicon2.jpg" // Replace with your logo path
              alt="Anajwala Logo"
              className=" h-20 object-contain"
            />
            {/* <h1 className="text-3xl font-bold text-gray-800">Anajwala</h1> */}
          </div>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 print:hidden"
          >
            Print Invoice
          </button>
        </div>

        {/* Invoice Info */}
        <div className="mb-4">
          <p><strong>Invoice ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Info</h2>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Phone:</strong> {order.customer_phone_no}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Pincode:</strong> {order.pincode}</p>
        </div>

        {/* Order Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        </div>

        {/* Item Table */}
        <table className="w-full table-auto border border-gray-200 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Product</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Quantity</th>
              {/* <th className="border px-4 py-2">Unit Price</th> */}
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2 text-left">{item.productName}</td>
                <td className="border px-4 py-2">
                  <img src={item.thumbnail} alt={item.productName} className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="border px-4 py-2">{item.quantity}</td>
                {/* <td className="border px-4 py-2">₹{(item.price/item.quantity).toFixed(2)}</td> */}
                <td className="border px-4 py-2">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="text-right text-xl font-semibold">
          Total: ₹{order.totalPrice.toFixed(2)}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-24 border-t text-sm text-gray-600 text-center">
          <p><strong>Anajwala</strong> — Delivering Freshness At Doorstep.</p>
          <p>Customer Care: +91 8889990352 | +91 8889990358 | Email: anajwalaproducts@gmail.com</p>
          <p>© {new Date().getFullYear()} Anajwala. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
