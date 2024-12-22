const mongoose = require('mongoose');
const { Schema } = mongoose;


const offerSchema = new Schema({

    name :{
        type : String,
        required: true,
    },
    description : {
        type : String, 
        required : true
    },
    category : {
        type : String,
        enum : ['flour']
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'upcoming'],
        default: 'active'
    },    
    discount: {
        type: Number,
        required: true
    },
    minPurchaseAmount: {
        type: Number,
        default: 1
    },
    maxUsage: {// Maximum times the offer can be used
        type: Number,
        default: 0
    },
    usageCount: {
        type: Number, // Track how many times the offer has been used
        default: 0
    },
    isApplicableToAll:{
        type : Boolean,
        required : true,
        default : true
    },
    applicableProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],    
    validFrom: {
        type: Date
    },
    validTo: {
        type: Date
    }

},{ timestamps: true });


const Cart = mongoose.model('Offer', offerSchema);

module.exports = Cart;