import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role=== "admin") {
    return next(new ErrorHandler("Admin can't buy the subscription", 404));
  }
  const plan_id = process.env.PLAN_ID;
  const subscription =await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id=subscription.id;
  user.subscription.status=subscription.status;

  await user.save();

  res.status(201).json({
    success:true,
    // subscription,
    subscriptionId:subscription.id
  })
});


// payment verification
export const paymentVerification=catchAsyncError(async(req,res,next)=>{
  const {razorpay_signature,razorpay_payment_id,razorpay_subscription_id}=req.body;

  const user=await User.findById(req.user._id);
  if(user.role==='admin'){
    return next(new ErrorHandler("Admin can't buy subscription",404));
  }
})
