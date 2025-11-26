// controllers/user.controller.js
const Service = require("../utils/index.js");

const getDashboard = async (req, res) => {
  try {
    const userId = req.token.id;

    const status = await Service.getUserStatus(userId);
    const taskProgress = await Service.getUserTaskProgressList(userId);

    res.json({
      success: true,
      data: {
        status,
        tasks: taskProgress,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.token.id;
    const profile = await Service.getUserProfile(userId);

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.token.id;
    const tasks = await Service.getUserTasks(userId);

    res.json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTaskDetails = async (req, res) => {
  try {
    const userId = req.token.id;
    const { task_id } = req.params;

    const task = await Service.getTaskDetails(task_id, userId);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.token.id;
    const { task_id } = req.params;
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: "Progress must be between 0 and 100",
      });
    }
    const status =
      progress === 100 ? "completed" : progress > 0 ? "in_progress" : "pending";

    const task = await Service.getTaskDetails(task_id, userId);

    if (!task)
      return res.status(403).json({
        success: false,
        message: "Unauthorized task access",
      });
    const doWeHaveTaskProgress = await Service.doWeHaveTaskProgressBefore(
      task_id,
      userId
    );
    if (doWeHaveTaskProgress) {
      await Service.updateTaskProgress(task_id, userId, progress);
      await Service.updateTaskStatus(task_id, status);
    } else {
      await Service.insertTaskProgress(task_id, userId, progress);
      await Service.updateTaskStatus(task_id, status);
    }

    res.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getDashboard,
  getProfile,
  getTasks,
  updateTask,
  getTaskDetails,
};
