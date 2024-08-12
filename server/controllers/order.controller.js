const Order = require('../models/order.model.js')
const User = require('../models/user.model.js')
const {Product} = require('../models/product.model.js')
const {errorhandler} = require('../utils/error.js')
const client = require('../utils/twilio.js')

/**
 * Controller method to create a new order
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createOrder = async (req, res) => {
  const {
    customerName,
    customer_phone_no,
    address,
    pincode,
    items, // Array of items with productId,productName, quantity, and price
    paymentMethod,
    orderNotes,
    totalPrice
  } = req.body;
  // console.log("order req ");
  
  try {
    // Validate the items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required and cannot be empty' });
    }

    // Calculate total price
    // const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create a new order object
    const newOrder = new Order({
      customerName,
      customer_phone_no: customer_phone_no,
      address,
      pincode,
      customerId: req.userId, // Retrieved from the auth middleware
      status: 'pending',
      paymentMethod,
      paymentStatus: 'pending',
      totalPrice,
      deliveryDate: null, // Assuming delivery date is not known at the time of order creation
      orderNotes,
      items
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    await User.findByIdAndUpdate(req.userId , {$addToSet :{orders : savedOrder._id}})

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });

    const message = await client.messages.create({
      body: `Hi ${customerName}! \nYour order has successfully been placed!\nOrder Id : ${savedOrder._id}`,
      from: 'whatsapp:+14155238886', // Replace with your Twilio WhatsApp-enabled number
      to: `whatsapp:+91${customer_phone_no}`   // Replace with the recipient's WhatsApp number
  });
  console.log('Message SID:', message.sid);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * returns array of all orders
 */
const getOrder = async (req , res , next)=>{
  try {
    
    const orders = await Order.find();
    res.json(orders)

  } catch (error) {
    next(error)
  }
}

/**
 * Currently updates the status of the order to new status coming from frontend.
 */
const updateOrder = async (req, res, next) => {
  try {
    const {id} = req.params
    const { newStatus , newPaymentStatus} = req.body;

    // Ensure that id and newStatus are provided
    if (!id && !newStatus && !newPaymentStatus ) {
      return next(errorhandler(400 ,"Missing required fields: id and newStatus" , "update failure" ))
    }
    
    const orderDoc = await Order.findById(id);
    if (!orderDoc) {
      return next(errorhandler(400 ,"Order not found" , "update failure" ))
    }
    if(newPaymentStatus){
        orderDoc.paymentStatus = newPaymentStatus
    }
    if(newStatus){
      orderDoc.status = newStatus
    }

    await orderDoc.save()

    res.status(200).json({ message: "Order updated successfully", order: orderDoc });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createOrder,
  getOrder,
  updateOrder
};
