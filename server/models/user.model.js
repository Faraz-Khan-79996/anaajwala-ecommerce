const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/256/5989/5989400.png"
    },
    role : {
      type : String,
      enum : ["admin" , "user"],
      default : "user"
    },
    saved: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
      default: [],
      sparse:true
    },
    orders: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }],
      default: []
    },
    coins : {
      type : Number,
      default : 0,
      required : true
    },
    referralCount : {//number of referral user has done.
      type : Number,
      default : 0,
      required : true
    },
    
    // userBookings: {
    //   type: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking"
    //   }]
    // },
    // listings: {
    //   type: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Listing'
    //   }],
    //   default: []
    // }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
