const {Product} = require('../models/product.model');
const { errorhandler } = require('../utils/error');

/**
 * Controller method to create a new product
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createProduct = async (req, res) => {
  const {
    name,
    type,           
    price,
    thumbnail,  
    images,
    description,
    stockQuantity,
    category,
    ratings,
    discount,
    MRP,
    size
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      type,
      price,
      thumbnail,
      images,
      description,
      stockQuantity,
      category,
      ratings,
      discount,
      MRP,
      size
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProduct = async (req , res , next)=>{
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product){
      return next(errorhandler(404 , "Product does not exist, might've be deleted" , "product not found"))
    }
    res.json(product)
  } catch (error) {
    console.log(error);
    
    next(error)
  }
}

const getAllProducts = async (req , res , next)=>{
  try {
    const products = await Product.find().sort('size');
    res.json(products);
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params; // Product ID from the request parameters
  const {
    name,
    type,           
    price,
    thumbnail,  
    images,
    description,
    stockQuantity,
    category,
    ratings,
    discount,
    size
  } = req.body; // Product fields from the request body

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.name = name !== undefined ? name : product.name;
    product.type = type !== undefined ? type : product.type;
    product.price = price !== undefined ? price : product.price;
    product.thumbnail = thumbnail !== undefined ? thumbnail : product.thumbnail;
    product.images = images !== undefined ? images : product.images;
    product.description = description !== undefined ? description : product.description;
    product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
    product.category = category !== undefined ? category : product.category;
    product.ratings = ratings !== undefined ? ratings : product.ratings;
    product.discount = discount !== undefined ? discount : product.discount;
    product.size = size !== undefined ? size : product.size;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct
};
