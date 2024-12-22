const Offer = require('../models/offer.model'); // Adjust the path based on your directory structure

// CREATE an offer
exports.createOffer = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            status,
            discount,
            minPurchaseAmount,
            maxUsage,
            usageCount,
            isApplicableToAll,
            applicableProducts,
            validFrom,
            validTo,
            code,
        } = req.body;

        const newOffer = new Offer({
            name,
            description,
            category,
            status,
            discount,
            minPurchaseAmount,
            maxUsage,
            usageCount,
            isApplicableToAll,
            applicableProducts,
            validFrom,
            validTo,
            code, // Ensure the code is unique
        });

        const savedOffer = await newOffer.save();
        res.status(201).json({ success: true, data: savedOffer });
    } catch (error) {
        if (error.code === 11000) { // Handle duplicate code error
            return res.status(400).json({
                success: false,
                message: 'Offer code must be unique.',
            });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// READ all offers
exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json({ success: true, data: offers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching offers', error: error.message });
    }
};

// READ a specific offer by ID
exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ success: false, message: 'Offer not found' });
        }
        res.status(200).json({ success: true, data: offer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching offer', error: error.message });
    }
};

// UPDATE an offer
exports.updateOffer = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Check if the code is unique before updating
        if (updates.code) {
            const existingOffer = await Offer.findOne({ code: updates.code, _id: { $ne: id } });
            if (existingOffer) {
                return res.status(400).json({
                    success: false,
                    message: 'Offer code must be unique.',
                });
            }
        }

        const updatedOffer = await Offer.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedOffer) {
            return res.status(404).json({ success: false, message: 'Offer not found.' });
        }
        res.status(200).json({ success: true, data: updatedOffer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE an offer
exports.deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ success: false, message: 'Offer not found' });
        }
        res.status(200).json({ success: true, message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting offer', error: error.message });
    }
};
