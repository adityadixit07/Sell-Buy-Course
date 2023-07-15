import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from '../utils/errorHandler.js'


// get all courses without lectures
export const getAllCoures = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({ success: true, courses });
});

// course created -> only admin
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  // if any field is empty
  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all fields",400));
  }
  // const file = req.file;
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });
  res
    .status(201)
    .json({
      success: true,
      messsage: "course created successfully. You can add lectures now",
    });
});


// add lectures
// delete course
// get course details
// delete lectures
