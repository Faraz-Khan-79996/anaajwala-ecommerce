const User = require("../models/user.model.js")
const bcryptjs = require("bcryptjs")
const { errorhandler } = require("../utils/error.js")
const jwt = require("jsonwebtoken")
const client = require('../utils/twilio.js')

const admin = require('firebase-admin');
const {serviceAccountJsonObject} = require('../firebase/firebaseServiceAccount.js')

// console.log(serviceAccountJsonObject)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJsonObject),
});

const coinsToAdd = 500;
//specify number of coins to add when the user joins with referral

/**
 * Handles user signup by validating input, creating a new user, and returning a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user details.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {string} req.body.phone_no - The phone number of the new user.
 * @param {Object} res - Responds with the user document along with jwt token and cookie.
 * @param {Function} next - The next middleware function.
 *
 * @returns {void}
 *
 * @throws {Error} Throws an error if validation fails or if there is a database error.
 */
const signup = async (req, res, next) => {
    const { username, phone_no } = req.body;
    const {referralGiver} = req.query
    let isReferralNumberCorrect = true

    // Validation
    if (!username || !phone_no) {
        return next(errorhandler(400, 'All fields are required.', 'Validation Error'));
    }

    if (typeof phone_no !== 'string' || phone_no.trim().length !== 10 || !/^\d+$/.test(phone_no)) {
        return next(errorhandler(400, 'Phone number must be exactly 10 digits.', 'Validation Error'));
    }

    // if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    //     return next(errorhandler(400, 'Invalid email format.', 'Validation Error'));
    // }

    // if (typeof password !== 'string' || password.length < 6) {
    //     return next(errorhandler(400, 'Password must be at least 6 characters long.', 'Validation Error'));
    // }

    if (typeof username !== 'string' || username.trim().length === 0) {
        return next(errorhandler(400, 'Username cannot be empty.', 'Validation Error'));
    }
    if (!referralGiver || typeof referralGiver !== 'string' || referralGiver.trim().length !== 10 || !/^\d+$/.test(referralGiver)) {
        isReferralNumberCorrect=false
    }
    const user = await User.findOne({ phone_no : phone_no.trim() });
    if (user) {
        return next(errorhandler(400, 'User already exists', 'Conflict'));
    }
    

    // const hashedPassword = bcryptjs.hashSync(password, 10);
    const maxAge = 31 * 24 * 60 * 60; // Token expiry time (31 days)

    try {
        const newUser = new User({
            username: username.toLowerCase().trim(),
            // email: email.toLowerCase().trim(),
            phone_no: phone_no.trim(),
            // password: hashedPassword,
            coins : 500,
            saved: [],
            orders: []
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        await newUser.save();

        // console.log({user : newUser._doc , access_token : token});
        const { password: pass, ...rest } = newUser._doc;
        

        res
            .cookie('access_token', token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(201)
            .json({user:rest , access_token : token}); // Directly send the user object

        try {
            if (isReferralNumberCorrect) {
                await User.findOneAndUpdate(
                    { phone_no: referralGiver },
                    { $inc: { coins: coinsToAdd } }
                );
            }            
        } catch (error) {
            console.log(error);
        }
            
    } catch (error) {
        next(errorhandler(500, error.message, 'Database Error'));
    }
};

/**
 * Handles user sign-in by validating input, checking credentials, and returning a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user credentials.
 * @param {string} req.body.username - The username of the user attempting to sign in.
 * @param {string} req.body.password - The password of the user attempting to sign in.
 * @param {Object} res - Responds with user document along with jwt token and cookie.
 * @param {Function} next - The next middleware function.
 *
 * @returns {void}
 *
 * @throws {Error} Throws an error if validation fails, user is not found, or if the password is incorrect.
 */
const signin = async (req, res, next) => {
    // const { phone_no } = req.params;
    const { idToken } = req.body;
    const maxAge = 31 * 24 * 60 * 60
    

    if (!idToken ) {
        return next(errorhandler(400, 'idToken from firebase missing', 'Validation Error'));
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const phoneNumber = decodedToken.phone_number.slice(3);

        // console.log(phoneNumber);
    

        const validUser = await User.findOne({ phone_no : phoneNumber.trim() })
        if (!validUser) {
            return next(errorhandler(404, 'User not found'))
        }

        // const validPassword = bcryptjs.compareSync(password, validUser.password)
        // if (!validPassword) return next(errorhandler(401, "Wrong credentials"))

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET )
        const { password: pass, ...rest } = validUser._doc;
        //rest is the entire document except the password
        
        res
            .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000 })
            .status(200)
            .json({user : rest , access_token : token })

    } catch (error) {
        next(error)
    }
}


/**
 * Handles user authentication via Google by verifying the ID token, checking user existence, and managing login or signup.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user credentials.
 * @param {string} req.body.idToken - The ID token provided by the client for verification.
 * @param {string} req.body.email - The email of the user attempting to sign in or sign up.
 * @param {string} req.body.name - The name of the user attempting to sign up.
 * @param {string} req.body.phone_no - The phone number of the user attempting to sign up.
 * @param {Object} req.query - The query parameters of the request.
 * @param {string} req.query.auth - The authentication type, either 'login' or 'signup'.
 * @param {Object} res - Responds with userDoc along with JWT token and cookie.
 * @param {Function} next - The next middleware function.
 *
 * @returns {void}
 *
 * @throws {Error} Throws an error if the ID token is missing, if the email already exists during signup, or if the email does not exist during login.
 */
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
        
        const { auth , referralGiver } = req.query
        let isReferralNumberCorrect = true
        // console.log(auth);
        // console.log(req.body);
        
        if (!referralGiver || typeof referralGiver !== 'string' || referralGiver.trim().length !== 10 || !/^\d+$/.test(referralGiver)) {
            isReferralNumberCorrect=false
        }        

        if (user) {

            if(auth == "signup"){
                next(errorhandler(409, "Given email Id already Exists!" , "signup Failure"))
                return;
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000 })
                .status(200)
                .json({user : rest , access_token : token});
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
                    req.body.name.toLowerCase(),
                email: req.body.email.toLowerCase().trim(),
                password: hashedPassword,
                phone_no : req.body.phone_no.toLowerCase().trim(),
                avatar: req.body.avatar || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
                coins : 500,
                saved:[] ,
                orders:[]
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true , maxAge : maxAge*1000})
                .status(200)
                .json({user : rest , access_token : token});
            
            try {
                if (isReferralNumberCorrect) {
                    await User.findOneAndUpdate(
                        { phone_no: referralGiver },
                        { $inc: { coins: coinsToAdd } }
                    );
                }                 
            } catch (error) {
                console.log(error.message);
                
            }                
                
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

const checkDuplicatePhoneNumber = async (req , res , next) => {
    try {
        const {phone_no} = req.params
        const userDoc = await User.findOne({phone_no : phone_no.trim()})
        console.log("req came");
        

        if(userDoc){
            return res.json({success : "true" , isPhoneNumberDuplicate : true , message : "Given phone number already exists" })
        }
        else{
            return res.json({success : "true" , isPhoneNumberDuplicate : false , message : "Phone number does not exists" })
        }
    } catch (error) {
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
    checkDuplicatePhoneNumber
}