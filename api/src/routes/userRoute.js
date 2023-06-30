const express = require('express');
const { signUp, logIn, resetPassword } = require('../controllers/registrationController.js');
const {updateUser,deleteUser,getUser,followAUser,unfollowAUser, getFollowers} =require('../controllers/userController.js')
const userRoute=express.Router();

userRoute.post('/signUp',signUp);
userRoute.post('/logIn',logIn);
userRoute.post('/resetPassword',resetPassword);

userRoute.put('/:id',updateUser);
userRoute.delete('/:id',deleteUser);
userRoute.get('/',getUser);

userRoute.put('/:id/follow',followAUser);
userRoute.put('/:id/unfollow',unfollowAUser);
userRoute.get('/followers/:userid',getFollowers);

module.exports=userRoute;
