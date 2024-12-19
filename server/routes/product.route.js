const express = require('express');
const router = express.Router();

const {createProduct , getProduct , updateProduct ,getAllProducts} = require('../controllers/product.controller');

const {isLoggedIn , isAdmin} = require('../middlewares/authMiddleware');

// Route to create a new product
router.get('/products' , getAllProducts)
router.post('/create', isLoggedIn, isAdmin, createProduct);
router.put('/:id/update', isLoggedIn, isAdmin, updateProduct);
router.get('/:id', getProduct);

module.exports = router;
