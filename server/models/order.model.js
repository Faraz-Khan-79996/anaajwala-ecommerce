const mongoose = require('mongoose');

/**
 * Schema for an order in the e-commerce platform.
 * @typedef {Object} OrderSchema
 * @property {string} customerName - The name of the customer.
 * @property {string} customer_phone_no - The phone number of the customer.
 * @property {string} address - The address of the customer.
 * @property {number} pincode - The pincode of the delivery address.
 * @property {ObjectId} customerId - The ID of the customer.
 * @property {string} status - The status of the order (pending, shipped, delivered, cancelled).
 * @property {string} paymentMethod - The payment method used (credit card, PayPal, cash on delivery).
 * @property {string} paymentStatus - The payment status (pending, completed, failed).
 * @property {number} totalPrice - The total price of the order.
 * @property {Date} deliveryDate - The expected delivery date.
 * @property {string} orderNotes - Additional notes or instructions from the customer.
 * @property {Array<Object>} items - The items in the order.
 * @property {Date} createdAt - The date when the order was created.
 * @property {Date} updatedAt - The date when the order was last updated.
 */
const orderSchema = new mongoose.Schema(
  {
    orderThrough: {
      type: String,
      required: true,
      enum : ["app" , "website" , "unknown"]
    },
    customerName: {
      type: String,
      required: true,
    },
    customer_phone_no: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'PayPal', 'cash on delivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    orderNotes: {
      type: String,
    },
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      productName:{
        type : String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {//Total price of that item
        type: Number,
        required: true,
      },
      type : {
        type : String,
      },
      thumbnail : {
        type : String,
      },
      texture:{
        type : String,
        enum : ['fine' , 'coarse'],
        required : true,
        default : 'fine'
      }
    }],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
