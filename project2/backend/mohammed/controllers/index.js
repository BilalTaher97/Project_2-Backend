// controllers/user.controller.js
import Service from "../utils/index.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = 1;

    const status = await Service.getUserStatus(userId);
    const taskProgress = await Service.getUserTaskProgressList(userId);

    res.json({
      success: true,
      data: {
        status,
        taskProgress: taskProgress,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = 1;
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

export const getTasks = async (req, res) => {
  try {
    const userId = 1;
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

export const updateTask = async (req, res) => {
  try {
    const userId = 1;
    const { task_id } = req.params;
    const { progress, status } = req.body;

    const task = await Service.getTaskDetails(task_id, userId);

    console.log(task_id, userId, progress, "<<<<<");

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
      console.log("Updating existing task progress");
      await Service.updateTaskProgress(task_id, userId, progress);
    } else {
      console.log("Inserting new task progress");
      await Service.insertTaskProgress(task_id, userId, progress);
    }

    if (!!status) {
      await Service.updateTaskStatus(task_id, status);
    }

    res.json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTaskDetails = async (req, res) => {
  try {
    const userId = 1;
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
