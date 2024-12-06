const User = require("../models/user.model.js")
const bcryptjs = require("bcryptjs")
const { errorhandler } = require("../utils/error.js")
const jwt = require("jsonwebtoken")
const client = require('../utils/twilio.js')


// import admin from 'firebase-admin'

// import serviceAccount from '../firebase_service_account.json' assert { type: "json" }

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });


const signup = async (req, res, next) => {
    const { username, email, password, phone_no } = req.body;

    // Validation
    if (!username || !email || !password || !phone_no) {
        return next(errorHandler(400, 'All fields are required.', 'Validation Error'));
    }

    if (typeof phone_no !== 'string' || phone_no.trim().length !== 10 || !/^\d+$/.test(phone_no)) {
        return next(errorHandler(400, 'Phone number must be exactly 10 digits.', 'Validation Error'));
    }

    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        return next(errorHandler(400, 'Invalid email format.', 'Validation Error'));
    }

    if (typeof password !== 'string' || password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters long.', 'Validation Error'));
    }

    if (typeof username !== 'string' || username.trim().length === 0) {
        return next(errorHandler(400, 'Username cannot be empty.', 'Validation Error'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const maxAge = 31 * 24 * 60 * 60; // Token expiry time (31 days)

    try {
        const newUser = new User({
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            phone_no: phone_no.trim(),
            password: hashedPassword,
            saved: [],
            orders: []
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: maxAge });
        await newUser.save();

        res
            .cookie('access_token', token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(201)
            .json(newUser); // Directly send the user object
    } catch (error) {
        next(errorHandler(500, 'An error occurred while creating the user.', 'Database Error'));
    }
};


const signin = async (req, res, next) => {
    const { username, password } = req.body;
    const maxAge = 31 * 24 * 60 * 60

    if (!username || !email || !password || !phone_no) {
        return next(errorHandler(400, 'All fields are required.', 'Validation Error'));
    }


    try {
        const validUser = await User.findOne({ username : username.toLowerCase().trim() })
        if (!validUser) {
            return next(errorhandler(404, 'User not found'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorhandler(401, "Wrong credentials"))

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET , {expiresIn : maxAge})
        const { password: pass, ...rest } = validUser._doc;
        //rest is the entire document except the password

        res
            .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000 })
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }
}



const google = async (req, res, next) => {
    try {

        if (!req.body.idToken) {
            // Verify the ID token provided by the client
            //will throw error if wrong or incorrect idToken
            next(errorhandler(404, "idToken missing"))
        } else {
            // const decodedToken = await admin.auth().verifyIdToken(req.body.idToken);
            console.log("req came");
        }

        const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
        const maxAge = 31 * 24 * 60 * 60

        // console.log(req.body);
        // console.log(user);
        
        const { auth } = req.query
        // console.log(auth);
        // console.log(req.body);
        

        if (user) {

            if(auth == "signup"){
                next(errorhandler(409, "Given email Id already Exists!" , "signup Failure"))
                return;
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn : maxAge});
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000 })
                .status(200)
                .json(rest);
        } else {
            if(auth == "login"){
                next(errorhandler(409, "Given email Id Does NOT exists!" , "signup Failure"))
                return;                
            }            
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email.toLowerCase().trim(),
                password: hashedPassword,
                phone_no : req.body.phone_no.toLowerCase().trim(),
                // avatar: req.body.photo,
                saved:[] ,
                orders:[]
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn : maxAge});
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000})
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

const applyForResetPassword = async(req , res , next)=>{
    try {
        let {username} = req.body;
        username = username.toLowerCase()
        const user = await User.findOne({username})
        if(!user){
            return next(errorhandler(404 , "Given username does not exists!" , "user not found"))
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        const message = await client.messages.create({
            body: `Follow the given link to reset your password\n\n${process.env.DOMAIN || "http://localhost:5173"}/reset-password/${user.username.split(' ')[0]}/${user._id}/${token}`,
            from: `whatsapp:${process.env.TWILIO_NO}`, // Replace with your Twilio WhatsApp-enabled number
            to: `whatsapp:+91${user.phone_no}`   // Replace with the recipient's WhatsApp number
        });        


        res.json({message : "Reset link send to your registered whatsapp number."})

    } catch (error) {
        console.log(error);
        next(error)
    }
}
const resetPassword = async(req , res , next)=>{
    try {
        
        const {id, token} = req.params
        const {password} = req.body
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.id != id){
            return next(errorhandler(401 , "You are not authorized!" , "unauthorized"))
        }
        
        const hashedPassword = bcryptjs.hashSync(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashedPassword})

        const user = await User.findById(id)
        res.json(user)

        const message = await client.messages.create({
            body: `Your password was updated successfully.\nDon't forget the new one!!!`,
            from: `whatsapp:${process.env.TWILIO_NO}`, // Replace with your Twilio WhatsApp-enabled number
            to: `whatsapp:+91${user.phone_no}`   // Replace with the recipient's WhatsApp number
        });            

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports =  {
    signup,
    signin,
    google,
    signOut,
    applyForResetPassword,
    resetPassword,
}