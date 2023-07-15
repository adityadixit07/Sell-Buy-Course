import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// register
router.route("/register").post(register);
// login
router.route("/login").post(login);
// logout
router.route("/logout").get(logout);
// getprofile
router.route("/me").get(isAuthenticated, getMyProfile);
// change password
router.route("/changepassword").put(isAuthenticated, changePassword);
// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// update profile picture/avatar
router.route("/updateprofilepicture").put(isAuthenticated, updateProfilePicture);

// forget password
router.route("/forgetpassword").post(forgetPassword);
// reset password
router.route("/resetpassword/:token").put(resetPassword);

export default router;
