const mongoose = require('mongoose');

/**
 * Schema for a product in the e-commerce platform.
 * @typedef {Object} ProductSchema
 * @property {string} name - The name of the product.
 * @property {string} type - The type of the product.
 * @property {number} price - The selling price of the product.
 * @property {number} MRP - The MRP of the product.
 * @property {number} size - The MRP of the product.
 * @property {string} thumbnail - URL of the product thumbnail image.
 * @property {string[]} images - Array of URLs of product images (max 6).
 * @property {string} description - A detailed description of the product.
 * @property {number} stockQuantity - Number of items in stock.
 * @property {string} category - Category the product belongs to.
 * @property {Object} ratings - Ratings information.
 * @property {number} ratings.average - Average rating of the product.
 * @property {number} ratings.numberOfReviews - Number of reviews for the product.
 * @property {number} discount - Discount percentage for the product.
 * @property {Date} createdAt - The date when the product was created.
 * @property {Date} updatedAt - The date when the product was last updated.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum : ['gold' , 'platinum', 'diamond' , 'silver' , 'multi-grain'],
      required: true,
    },
    // price: {
    //   type: {},
    //   required: true,
    // },
    price :{
      type : Number,
    },
    MRP :{
      type : Number,
    },
    size : {
      type : Number
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, '{PATH} exceeds the limit of 6'],
    },
    description: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum : ['flour'],
      required: true,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      numberOfReviews: {
        type: Number,
        default: 0,
      },
    },
    discount: {
      type: Number, // Discount in percentage
      default: 0,
      min: 0,
      max: 100,
    },

  },
  { timestamps: true }
);

// Validator for images array size
function arrayLimit(val) {
  return val.length <= 6;
}

const Product = mongoose.model('Product', productSchema);
// module.exports = Product;

module.exports = {
  productSchema,
  Product
}

