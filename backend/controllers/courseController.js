import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from 'cloudinary';




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
    return next(new ErrorHandler("Please add all fields", 400));
  }
  // upload file
  const file = req.file;
  // console.log(file)
 const fileUri=getDataUri(file);
//  console.log(fileUri.content)
const mycloud=await cloudinary.v2.uploader.upload(fileUri.content)

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url:mycloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    messsage: "course created successfully. You can add lectures now",
  });
});

// get all lectures of  course
export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  course.views = course.views + 1;
  await course.save();
  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// add lectures
export const addLecture = catchAsyncError(async (req, res, next) => {
  const {id}=req.params.id
  const { title, description } = req.body;

  // const file=req.file

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("Invalid course id!"));
  }

  // upload file on cloudinary

  course.lectures.push({
    title,
    description,
    video: {
      public_id: "video url",
      url: "temp url",
    },
  });

  course.numOfVideos+=1;

  await course.save();

  res.status(200).json({
    success: true,
    message: "lectures added in course successfully",
  });
});

// delete course
// get course details
// delete lectures
