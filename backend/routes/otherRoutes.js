import express from "express";
import { contact,courseRequest, getDashboardStats } from "../controllers/OtherController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form
router.route("/contact").post(contact);

//request form
router.route("/courserequest").post(courseRequest);

// get admin stats
router.route('/admin/stats').get(isAuthenticated,authorizeAdmin,getDashboardStats);

export default router;
