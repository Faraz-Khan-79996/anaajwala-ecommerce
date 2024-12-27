const express = require('express')
const {sendOTP ,otpSignin, signup , signin, google , signOut , applyForResetPassword , resetPassword, verifyAndRegister} = require( '../controllers/auth.controller.js');
const { isLoggedIn } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/sendOTP' , sendOTP)
// router.post('/signup' , signup)
router.post('/signup' , verifyAndRegister)
// router.post('/signin' , signin)
router.post('/signin' , otpSignin)
router.post('/google' , google)
router.post('/signout', signOut)
router.post('/forgot-password' , applyForResetPassword)
router.post('/reset-password/:id/:token' , resetPassword)

module.exports = router