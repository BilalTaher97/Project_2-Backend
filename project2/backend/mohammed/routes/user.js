const express = require("express");
const authentication = require("../../middleware/authentication.js");
const {
  getDashboard,
  getProfile,
  getTasks,
  updateTask,
  getTaskDetails,
} = require("../controllers/index.js");
const authorization = require("../../middleware/authorization.js");
const { PERMISSIONS } = require("../utils/constants.js");
const userRouter = express.Router();

// Dashboard overview
userRouter.get(
  "/dashboard",
  authentication,
  authorization(PERMISSIONS.get_dashboard),
  getDashboard
);

// Profile details
userRouter.get(
  "/profile",
  authentication,
  authorization(PERMISSIONS.get_profile),
  getProfile
);

// List of user's tasks
userRouter.get(
  "/tasks",
  authentication,
  authorization(PERMISSIONS.list_tasks),
  getTasks
);

// Update task status or progress
userRouter.put(
  "/tasks/:task_id",
  authentication,
  authorization(PERMISSIONS.update_task),
  updateTask
);

// Task details by ID
userRouter.get(
  "/tasks/:task_id",
  authentication,
  authorization(PERMISSIONS.read_task),
  getTaskDetails
);

module.exports = userRouter;
