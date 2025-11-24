import express from "express";
import {
  getDashboard,
  getProfile,
  getTasks,
  updateTask,
  getTaskDetails,
} from "../controllers/index.js";

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

export default userRouter;
