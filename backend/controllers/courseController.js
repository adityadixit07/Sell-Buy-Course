import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// get all courses without lectures
export const getAllCoures = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({ success: true, courses });
});

// -----------------------course created -> only admin--------------
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  // if any field is empty
  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all fields", 400));
  }
  // upload file
  const file = req.file;
  // console.log(file)
  const fileUri = getDataUri(file);
  //  console.log(fileUri.content)
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    messsage: "course created successfully. You can add lectures now",
  });
});

//---------------------get all lectures of  course---------------
export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  // const {id}=req.params;
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

// -------------add lectures-----------------
export const addLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("Course not found!", 404));
  }
  // upload file on cloudinary
  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;
  
  const lecId = course.lectures.id;
  console.log(lecId);

  await course.save();

  res.status(200).json({
    success: true,
    message: "lectures added in course successfully🎉",
  });
});

// delete course
export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return next(
      new ErrorHandler(
        "Can't found course! So lecture can not be deleted ",
        404
      )
    );
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);
  // console.log(course.poster.public_id)

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

 await course.deleteOne(); //this will remove the course

  res.status(200).json({
    success: true,
    message: "course deleted successfully 🎉",
  });
});



// its time to delete the lectures

// delete lectures
export const deleteLectures = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Lecture not found", 404));
  }
  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) {
      return item;
    }
  });
  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) {
      return item;
    }
  });

  course.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});
