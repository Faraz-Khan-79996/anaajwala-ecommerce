const Offer = require('../models/offer.model'); // Adjust the path based on your directory structure

// CREATE an offer
exports.createOffer = async (req, res) => {
    try {
        const { name, description, category, status, discount, minPurchaseAmount, maxUsage, usageCount, isApplicableToAll, applicableProducts, validFrom, validTo } = req.body;

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
            validTo
        });

        const savedOffer = await newOffer.save();
        res.status(201).json({ success: true, data: savedOffer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating offer', error: error.message });
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
    try {
        const { name, description, category, status, discount, minPurchaseAmount, maxUsage, usageCount, isApplicableToAll, applicableProducts, validFrom, validTo } = req.body;

        const updatedOffer = await Offer.findByIdAndUpdate(
            req.params.id,
            {
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
                validTo
            },
            { new: true, runValidators: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ success: false, message: 'Offer not found' });
        }

        res.status(200).json({ success: true, data: updatedOffer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating offer', error: error.message });
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
