import express from "express";
import {
  getAllCoures,
  createCourse,
  getCourseLecture,
  addLecture,
  deleteCourse,
  deleteLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// -----------------all available courses-----------------
router.route("/courses").get(getAllCoures);

// ---------------------------create course only admin----------------
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//   --------------get course lectures---------------
// router.route("/course/:id").get(getCourseLecture);

// -----------------get course lectureadd,add lectures,delete course------------
router
  .route("/course/:id")
  .get(isAuthenticated,authorizeSubscribers, getCourseLecture)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);


// delete lectures
router.route("/lecture").delete(isAuthenticated,authorizeAdmin,deleteLectures);

export default router;
