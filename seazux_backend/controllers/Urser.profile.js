const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/User');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const config = require("../config/config")
require('dotenv').config();


/////////////////////////////////////// USERS PROFILE ////////////////////////////////////////////////////////////////////////////////////
// GET USER PROFILE
const profile = async (req, res) => {
    try {
        
        // const user = req.user._id;

        const user = await User.findOne(req.user._id)
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not found"
            })
        }

        res.status(200)
        .json({
            success: true,
            user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            error: error.message
        })
    }
}
// DELETE USER PROFILE
const  deleteAccount = async (req, res) => {
  try {

      const user = req.user;

      const {urls} = await user.populate('urls');

      urls.map(async(url)=>{
          const searchAnalytic = await Analytics.findOne({urlHash:url.hash});
          if(searchAnalytic){
              await searchAnalytic.remove();
          }
          await url.remove();
      })

      await user.remove();

      res
      .cookie('token', null, {expires: new Date(Date.now()),httpOnly: true})
      .status(200).json({
          success: true,
          message: "Account Deleted Successfully"
      })
      
  } catch (error) {
      res.status(400).json({
          success:false,
          error: error.message
      })
  }
}

module.exports = {
    profile,
    deleteAccount
}