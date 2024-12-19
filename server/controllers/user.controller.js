const User = require("../models/user.model.js")
const { errorhandler } =  require("../utils/error.js")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


/**
 * 
 *  function responds with userDoc for the given id
 *  coming from request parameters.
 */
const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) return next(errorhandler(404, 'User not found!'));

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

/**
 * This Function takes cookie from the request and responds with a userDocument to the frontend.
 * 
 * @param {*} req request has req.userId which is added by isLoggedin() middleware
 * @param {*} res responds with userDocument after removing password
 * @param {*} next to pass on errors
 * 
 */
const profile = async(req , res , next)=>{

    try {
        const user = await User.findById(req.userId);
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

const getOrders = async (req , res , next)=>{
    try {
        // console.log(req.userId);
        // console.log("req came");
        
        //_id was there as well, therefore have to destructure
        const user = await User.findById(req.userId)
                    .populate({
                        path: 'orders',
                        options: { sort: { createdAt: -1 } }, // Sort orders by createdAt in descending order
                    })
                    .select('orders');

                    const { orders } = user; // Extract the sorted orders.

        res.json(orders);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { name, phone_no, password } = req.body;

    // Validation
    if (!name || !password || !phone_no) {
        return next(errorhandler(400, 'All fields are required.', 'Validation Error'));
    }

    if (typeof phone_no !== 'string' || phone_no.trim().length !== 10 || !/^\d+$/.test(phone_no)) {
        return next(errorhandler(400, 'Phone number must be exactly 10 digits.', 'Validation Error'));
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
        return next(errorhandler(400, 'Username cannot be empty.', 'Validation Error'));
    }

    try {
        const validUser = await User.findById(req.user.id); // Assuming you have a middleware that adds the user's ID to req.user
        if (!validUser) {
            return next(errorhandler(404, 'User not found'));
        }

        // Verify the provided password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorhandler(401, 'Incorrect password'));
        }

        // Update fields if password verification is successful
        if (name) validUser.username = name.toLowerCase().trim();
        if (phone_no) validUser.phone_no = phone_no;

        const updatedUser = await validUser.save();

        const maxAge = 3 * 24 * 60 * 60;
        const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: maxAge });

        const { password: pass, ...rest } = updatedUser._doc; // Exclude password from the response

        res
            .cookie('access_token', token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getUser,
    profile,
    getOrders,
    updateUser
}