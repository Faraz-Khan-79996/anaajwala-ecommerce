const User = require("../models/user.model.js");
const Order = require("../models/order.model.js")
const mongoose = require("mongoose");
const path = require("path");
const { Product } = require("../models/product.model.js");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_STRING);
    
    console.log("database connected");
}

async function addFieldToCollection() {


    try {
        // Update all users to add the role field with the value "user"
        const result = await User.updateMany({}, { $set: { MRP: 10000 } });
        console.log(`Successfully updated ${result.nModified} users`);
    } catch (error) {
        console.error('Error updating users:', error);
    }
}
async function addFieldToProductCollection() {


    try {
        
        // const result = await Product.updateMany({}, { $set: { MRP: 1000 } });
        const result = await Product.updateMany({}, { $set: { size: 5 } });
        console.log(`Successfully updated ${result.nModified} products`);
    } catch (error) {
        console.error('Error updating users:', error);
    }
}

const clearOrders = async ()=>{
    await User.updateMany({} , {$set:{orders : []}})
    await Order.deleteMany({})

    console.log("Job Done");
    
}

const addFieldToUserCollection = async () => {
    try {
        // await User.updateMany({} , {$set : {coins : 0 , referralCount:0}})
        console.log("fields added to user collection");
        
    } catch (error) {
        console.log("Error happened" , error.message);
        
    }
} 

// addFieldToCollection()
// addFieldToProductCollection()
addFieldToUserCollection()
// clearOrders()