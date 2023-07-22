import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists ", 409));
  }
  // upload file on cloudinary

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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
  const user = await User.findById(req.user._id);
  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id); //previous one deleted

  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };
  await user.save();

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
  await user.save();
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
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  // if user is not found
  if (!user) {
    return next(new ErrorHandler("token is invalid or has been expired"));
  }
  // if we get the user
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;

  user.save();

  res.status(200).json({
    success: true,
    message: "password changed successfully",
    token,
  });
});

// add to playlist

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Invalid course id", 404));
  }

  // if playlist is alaready created then we do not create it again
  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });
  if (itemExist) {
    return next(
      new ErrorHandler("item exists -> Playlist is already exists.", 409)
    );
  }

  // add playlist
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });
  await user.save();

  res.status(200).json({
    success: true,
    message: "Course added to playlist 🎉",
  });
});

// remove from playlist
export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Invalid course id", 404));
  }

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) {
      return true;
    }
  });

  user.playlist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed from the playlist 👍",
  });
});

// admin section 😎

//admin routes
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

// update user role
export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No user found", 404));
  }
  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully🚀",
  });
});

// delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // cancel subscription

  await user.deleteOne(); //remove the user

  res.status(200).json({
    success: true,
    message: "user deleted successfully🚀",
  });
});

// delete my profile
export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // cancel subscription

  await user.deleteOne(); //remove the user

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user deleted successfully🚀",
    });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "active" });
  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());
  await stats[0].save();
});
