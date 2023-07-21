import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    requred: [true, "Please enter course title"],
    minLength: [6, "Title must be contains atleast 6characters."],
    maxLength: [60, "Title is too long"],
  },
  description: {
    type: String,
    requred: [true, "Please enter course description"],
    minLength: [10, "Description must contain atleast 10 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        requred: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter course creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
