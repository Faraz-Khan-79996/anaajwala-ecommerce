const express = require('express')
const {  getUser , profile , getOrders ,updateUser, deleteUser} = require('../controllers/user.controller.js')
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/profile', isLoggedIn,profile)
router.post('/profile/update', isLoggedIn, updateUser)
router.get('/orders', isLoggedIn ,  getOrders)
router.get('/:id', getUser)
router.delete('/delete' , isLoggedIn , isAdmin , deleteUser)

module.exports =  router;