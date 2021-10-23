 import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler( async(req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];

 if(req.headers.authorization && req.headers.authorization.startsWith("bearer")) {
   
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  req.user = await User.findOne({_id : decoded.id}).select("-password");
     req.user = await User.findOne({_id : decoded.id});

     next();
 } 

 if(!token) {
     res.status(401);
     throw  new Error("not authorized")
 }

    
})

export {protect}


