const express = require('express');
const router = express.Router();
const {
  addTask,
  getAllTasks,
  getTask,
  updateTaskById,
  deleteTaskById
} = require('../controllers/taskController');

// Route to add a new task
router.post('/tasks', addTask);

// Route to get all tasks
router.get('/tasks', getAllTasks);

// Route to get a single task by ID
router.get('/tasks/:id', getTask);

// Route to update a task by ID
router.put('/tasks/:id', updateTaskById);

// Route to delete a task by ID
router.delete('/tasks/:id', deleteTaskById);

module.exports = router;
