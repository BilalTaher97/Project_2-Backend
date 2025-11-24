const express = require("express");
const {
  getDashboard,
  getProfile,
  getTasks,
  updateTask,
  getTaskDetails,
} = require("../controllers/index.js");

const userRouter = express.Router();

// Dashboard overview
userRouter.get("/dashboard", getDashboard);

// Profile details
userRouter.get("/profile", getProfile);

// List of user's tasks
userRouter.get("/tasks", getTasks);

// Update task status or progress
userRouter.put("/tasks/:task_id", updateTask);

// Task details by ID
userRouter.get("/tasks/:task_id", getTaskDetails);

module.exports = userRouter;
