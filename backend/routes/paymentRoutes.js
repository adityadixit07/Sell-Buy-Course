import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  getRazorPayKey,
  paymentVerification,
  cancelSubscription,
} from "../controllers/paymentController.js";

const router = express.Router();

// buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// payment verification and save refrence to database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// get razor pay key
router.route("/razorpaykey").get(getRazorPayKey);

// cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
