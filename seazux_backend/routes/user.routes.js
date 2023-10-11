const express = require('express');
const userRoute = express.Router();
const {profile,deleteAccount} = require("../controllers/Urser.profile");
const {isAuthenticated} = require("../authentication/auth");

userRoute.get('/profile',isAuthenticated,profile);
userRoute.delete('/deleteAccount',isAuthenticated, deleteAccount);

module.exports = userRoute;