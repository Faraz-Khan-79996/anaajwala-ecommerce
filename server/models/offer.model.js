const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['flour'],
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'upcoming'],
        default: 'active',
    },
    discount: {
        type: Number,
        required: true,
    },
    minPurchaseAmount: {
        type: Number,
        default: 1,
    },
    maxUsage: {
        type: Number,
        default: 0,
    },
    usageCount: {
        type: Number,
        default: 0,
    },
    isApplicableToAll: {
        type: Boolean,
        required: true,
        default: true,
    },
    applicableProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    validFrom: {
        type: Date,
    },
    validTo: {
        type: Date,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
