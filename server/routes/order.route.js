/**
 * Order routes.
 * @module routes/order
 */

const express = require('express');
const {
  createOrder,
  getOrder,
  updateOrder,
} = require('../controllers/order.controller.js');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/:id/update', isLoggedIn, isAdmin, updateOrder);
router.get('/orders', isLoggedIn, isAdmin, getOrder);
router.post('/create', isLoggedIn, createOrder);

module.exports = router;
