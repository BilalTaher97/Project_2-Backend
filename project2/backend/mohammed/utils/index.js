const pool = require("../../models/db.js");

/* ===============================
   Dashboard Services
=============================== */
const getUserStatus = async (userId) => {
  const query = `
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status = 'completed') AS completed,
      COUNT(*) FILTER (WHERE status = 'pending') AS pending,
      COUNT(*) FILTER (WHERE status = 'in-progress') AS in_progress,
      COUNT(*) FILTER (
          WHERE due_date < NOW()
          AND status != 'completed'
      ) AS overdue
    FROM tasks
    WHERE user_id = $1;
  `;
  return (await pool.query(query, [userId])).rows[0];
};

const getUserTaskProgressList = async (userId) => {
  const query = `
    SELECT 
      t.id,
      t.task_name,
      COALESCE(tp.progress_percentage, 0) AS progress
    FROM tasks t
    LEFT JOIN task_progress tp ON tp.task_id = t.id
    WHERE t.user_id = $1;
  `;
  return (await pool.query(query, [userId])).rows;
};

/* ===============================
   Profile Service
=============================== */
const getUserProfile = async (userId) => {
  const query = `
    SELECT id, name, photo, department, email, role_id, isactive, created_at 
    FROM users
    WHERE id = $1;
  `;
  return (await pool.query(query, [userId])).rows[0];
};

/* ===============================
   Tasks Services
=============================== */
const getUserTasks = async (userId) => {
  const query = `
    SELECT 
      t.id,
      t.task_name,
      t.status,
      t.due_date,
      COALESCE(tp.progress_percentage, 0) AS progress
    FROM tasks t
    LEFT JOIN task_progress tp ON tp.task_id = t.id
    WHERE t.user_id = $1
    ORDER BY t.due_date ASC;
  `;
  return (await pool.query(query, [userId])).rows;
};

const insertTaskProgress = async (taskId, userId, progress) => {
  const query = `
    INSERT INTO task_progress (task_id, employee_id, progress_percentage)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return (await pool.query(query, [taskId, userId, progress])).rows[0];
};

const doWeHaveTaskProgressBefore = async (taskId, userId) => {
  const query = `
    SELECT *
    FROM task_progress
    WHERE task_id = $1 AND employee_id = $2;
  `;
  return (await pool.query(query, [taskId, userId])).rows[0];
};

const updateTaskProgress = async (taskId, userId, progress) => {
  const query = `
    UPDATE task_progress
    SET progress_percentage = $1
    WHERE task_id = $2 AND employee_id = $3
    RETURNING *;
  `;
  return (await pool.query(query, [progress, taskId, userId])).rows[0];
};

const updateTaskStatus = async (taskId, status) => {
  const query = `UPDATE tasks SET status = $1 WHERE id = $2`;
  return pool.query(query, [status, taskId]);
};

const getTaskDetails = async (taskId, userId) => {
  const query = `
    SELECT 
      t.id,
      t.task_name,
      t.description,
      t.assigned_date,
      t.due_date,
      t.status,
      COALESCE(tp.progress_percentage, 0) AS progress
    FROM tasks t
    LEFT JOIN task_progress tp ON tp.task_id = t.id
    WHERE t.id = $1 AND t.user_id = $2;
  `;
  return (await pool.query(query, [taskId, userId])).rows[0];
};

module.exports = {
  getUserStatus,

  getUserProfile,
  getUserTasks,

  getUserTaskProgressList,

  updateTaskStatus,

  getTaskDetails,

  insertTaskProgress,
  doWeHaveTaskProgressBefore,
  updateTaskProgress,
};
