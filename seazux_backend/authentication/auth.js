const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req,res,next)=>{
    try {

        console.log(req.headers);
        // const {token}  = req.cookies;
        const {token} = req.headers.authorization || req.cookies;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                error: "Please login first",
                success: false
            })
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        if(!req.user){
            return res.status(401).json({
                error: "Please login first",
                success: false
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}