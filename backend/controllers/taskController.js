const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../models/taskModel');

// Add a new task
const addTask = async (req, res) => {
  try {
    const { description, status = 'pending' } = req.body;
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: 'Description is required.' });
    }
    const taskData = { description, status };
    const newTask = await createTask(taskData);
    res.status(201).json({ message: 'Task created', task: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Get a task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status } = req.body;

    if (!description && !status) {
      return res.status(400).json({ message: 'Description or status required to update' });
    }

    const taskData = {};
    if (description) taskData.description = description;
    if (status) taskData.status = status;

    const taskUpdated = await updateTask(id, taskData);
    if (!taskUpdated) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated', task: { _id: id, ...taskData } });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeleted = await deleteTask(id);
    if (!taskDeleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = { addTask, getAllTasks, getTask, updateTaskById, deleteTaskById };
