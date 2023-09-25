const express = require('express');
const userRoute = express.Router();
const {SignUp, login, logout} = require("../controllers/Users.controllers");
const {profile,deleteAccount} = require("../controllers/Urser.profile");
const {isAuthenticated} = require("../authentication/auth");

userRoute.post('/register', SignUp);
userRoute.post('/login', login);
userRoute.get('/logout', logout);
userRoute.get('/user/profile',isAuthenticated,profile);
userRoute.delete('/user/deleteAccount',isAuthenticated, deleteAccount);

module.exports = userRoute;