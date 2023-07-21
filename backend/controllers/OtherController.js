import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

// contact
export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return next(new ErrorHandler("Please enter the required fields", 404));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact to CourseApp";
  const text = `I am ${name} and my Email is ${email}.\n ${message}`;

  await sendEmail(to, subject, text);

  res.staus(200).json({
    success: true,
    message: "Your message has been sent successfully....😃",
  });
});

// course request
export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  const to = process.env.MY_MAIL;
  const subject = "Requesting for a course on CourseApp";
  const text = `I am ${name} and my Email is ${email}.\n ${course}`;

  await sendEmail(to, subject, text);

  res.staus(200).json({
    success: true,
    message: "Your request has been sent successfully....🚀",
  });
});

//dashboard stats
export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({})
    .sort({
      createdAt: "desc",
    })
    .limit(12);
  const statsData = [];
  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const userCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let usersProfit = true;
  let viewsProfit = true;
  let subscriptionProfit = true;

  let usersPercentage = 0;
  let viewsPercentage = 0;
  let subscriptionPercentage = 0;

  if (statsData[10].users === 0) usersPercentage = userCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };
    usersPercentage = (difference.users / statsData[11].users) * 100;
    viewsPercentage = (difference.views / statsData[11].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[11].subscription) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    userCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  });
});
