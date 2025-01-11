const { errorhandler } = require("../utils/error.js");
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

//It will populate req with user 
// const isLoggedIn = (req, res, next) => {

//     const token = req.cookies.access_token;

//     if (!token) {
//         return next(errorhandler(401, 'Unauthorized'));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return next(errorhandler(403, 'Forbidden'))
//         req.userId = user.id;
//         next()
//     })
// }


const isLoggedIn = async (req, res, next) => {
    
    // Extract token from cookies or Authorization header
    const token = req.cookies.access_token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    
    if (!token || req.headers.authorization == "Bearer null") {
        return next(errorhandler(401, 'Unauthorized'));
    }

    console.log(req.headers.authorization);
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return next(errorhandler(401, 'Invalid authentication token'));
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return next(errorhandler(401, 'Access denied. Admins only.'));
    }
};

module.exports = {
    isLoggedIn,
    isAdmin
}