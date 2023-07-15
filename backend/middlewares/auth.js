import jwt from 'jsonwebtoken'
import { catchAsyncError } from './catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js';
import { User } from '../models/User.js';

export const isAuthenticated=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Not logged in",401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRETKEY);
    req.user=await User.findById(decoded._id);
    next();
})
