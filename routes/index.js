const express = require('express');
const router = express.Router();

const userController = require('../controller/user_controller');




router.post('/add-user', userController.addUser);// Route :- addUser

router.post('/login-user', userController.loginUser);// Route :- loginUser

router.post('/add-order', userController.addOrder);// Route :- addOrder

router.get('/get-order', userController.getOrder);// Route :- getOrder



// export the router for use
module.exports=router;