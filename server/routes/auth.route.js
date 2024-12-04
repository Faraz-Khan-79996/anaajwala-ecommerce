const express = require('express')
const {signup , signin, google , signOut , applyForResetPassword , resetPassword} = require( '../controllers/auth.controller.js');
const { isLoggedIn } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/signup' , signup)
router.post('/signin' , signin)
router.post('/google' , google)
router.post('/signout', signOut)
router.post('/forgot-password' , applyForResetPassword)
router.post('/reset-password/:id/:token' , resetPassword)

module.exports = router