import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file=req.file
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists ", 409));
  }
  // upload file on cloudinary
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempurl",
      url: "tempurl",
    },
  });
  //   res.status(201).json({message:"User registered successfully."})
  sendToken(res, user, "Registered successfully 🚀", 201);
});

// login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //   if email or password in not entered
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect email or password ", 401));
  }
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

// logout ->we just empty the cookie
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out succcessfully",
    });
});

// get my profile
export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// change password

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  // if old password or new password fields are missing
  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return next(new Error("Incorrect old password", 400));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully🚀",
  });
});

// update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully🚀",
  });
});

// update profile picture

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  console.log("update profile picture");
  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully 🚀",
  });
});



// forgetpassword
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("No user exists with this email", 400));
  }
  // if user present then we create a new token
  const resetToken = await user.getResetToken();
  // send token by email
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `click on the link to reset the password.${url}.If you are not requested then please igonre this message`;

  await sendEmail(user.email, "Course app reset password ", message);
  
  res.status(200).json({
    success: true,
    message: `Reset token has been send to  your email: ${user.email}`,
  });
});




// reset paassword
export const resetPassword = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "forget password",
  });
});
