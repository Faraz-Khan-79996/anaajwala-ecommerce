const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    phone_no: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires in 5 minutes
    },
});

module.exports = mongoose.model('OTP', OTPSchema);
