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
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// --------------------Register/Login-----------------

// register
router.route("/register").post(singleUpload, register);
// login
router.route("/login").post(login);
// logout

// ---------------Profile -----------------
router.route("/logout").get(logout);
// getprofile
router.route("/me").get(isAuthenticated, getMyProfile);
// delete my profile
router.route("/my").delete(isAuthenticated,deleteMyProfile);
// change password
router.route("/changepassword").put(isAuthenticated, changePassword);
// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// update profile picture/avatar
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// ----------------Password (Forget/ Reset)----------------

// forget password
router.route("/forgetpassword").post(forgetPassword);
// reset password
router.route("/resetpassword/:token").put(resetPassword);

// --------------------Playlist---------------------------

// add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
// remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// admin routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

// admin role change
router
  .route("/admin/user/:id")
  .put(isAuthenticated,authorizeAdmin,updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
