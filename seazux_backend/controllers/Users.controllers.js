const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/User');
const config = require("../config/config")
require('dotenv').config();


// Sign Up function
const SignUp = async (req, res) =>{
    try{
    
        if(!req.body.username || !req.body.email || !req.body.password){
            return res.status(400).json({
                success:false,
                message: 'Please Enter all the required field'
            })
        }
    
        if(req.body.password.length <8){
            return res.status(400).json({
                success: false,
                message: "minimum 8 characters required in password"
            })
        }
    
        const {username, email, password} = req.body;
    
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already Exist"
            });
        }
    
        const newUser = await User.create({
            username,
            email,
            password
        })
    
        const token = await newUser.generateToken();
    
        const option = {
            expiresIn: new Date(Date.now() + 30*24*60*60*1000),
            httpOnly: true,
        }
    
        res.status(200).cookie('token', token, option).json({
            success: true,
            message: "User created successfully",
            user: newUser
        })
    
    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
}


//LOGIN Controller
const login = async (req, res) => {
 
    try {
    
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: 'Please Enter all the required field'
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = user.generateToken();

        const option = {
            expiresIn: new Date(Date.now() + 30*24*60*60*1000),
            httpOnly: true
        }

        res.status(200).cookie('token', token, option).json({
            success: true,
            message: "User logged in successfully",
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
}


//LOGOUT CONTROLLER
const logout = async (req, res) => {
    try {
        res.clearCookie('token').json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
}
 
// /////////////////////////////////////// USERS PROFILE ////////////////////////////////////////////////////////////////////////////////////
// // GET USER PROFILE
// const profile = async (req, res) => {
//     try {
        
//         const user = req.user._id;

//         const users = await User.findOne(user)
//         if(!users){
//             return res.status(400).json({
//                 success:false,
//                 message: "User not found"
//             })
//         }

//         res.status(200)
//         .json({
//             success: true,
//             users
//         })

//     } catch (error) {
//         res.status(400).json({
//             success:false,
//             error: error.message
//         })
//     }
// }
// // DELETE USER PROFILE
// const  deleteAccount = async (req, res) => {
//   try {

//       const user = req.user;

//       const {urls} = await user.populate('urls');

//       urls.map(async(url)=>{
//           const searchAnalytic = await Analytics.findOne({urlHash:url.hash});
//           if(searchAnalytic){
//               await searchAnalytic.remove();
//           }
//           await url.remove();
//       })

//       await user.remove();

//       res
//       .cookie('token', null, {expires: new Date(Date.now()),httpOnly: true})
//       .status(200).json({
//           success: true,
//           message: "Account Deleted Successfully"
//       })
      
//   } catch (error) {
//       res.status(400).json({
//           success:false,
//           error: error.message
//       })
//   }
// }



module.exports = {
    SignUp,
    login,
    logout
}
