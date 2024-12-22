const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer.controller'); // Adjust the path based on your directory structure

// Route to CREATE an offer
router.post('/', offerController.createOffer);

// Route to READ all offers
router.get('/', offerController.getAllOffers);

// Route to READ a specific offer by ID
router.get('/:id', offerController.getOfferById);

// Route to UPDATE an offer
router.put('/:id', offerController.updateOffer);

// Route to DELETE an offer
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
