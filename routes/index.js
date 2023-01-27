const express = require('express');
const router = express.Router();

const userController = require('../controller/user_controller');


// User routes

router.post('/adduser', userController.addUser);

router.post('/login-user', userController.loginUser);

router.post('/add-order', userController.addOrder);

router.get('/get-order', userController.getOrder);


// export the router for use
module.exports=router;