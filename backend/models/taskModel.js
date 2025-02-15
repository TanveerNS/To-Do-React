// taskModel.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

// Task schema can be more complex, but for simplicity:
const createTask = async (taskData) => {
  const db = getDb();
  const collection = db.collection('tasks');
  const result = await collection.insertOne(taskData);
  return { ...taskData, _id: result.insertedId };
};

const getTasks = async () => {
  const db = getDb();
  const collection = db.collection('tasks');
  const tasks = await collection.find().toArray();
  return tasks;
};

const getTaskById = async (id) => {
  const db = getDb();
  const collection = db.collection('tasks');
  const task = await collection.findOne({ _id: new ObjectId(id) });
  return task;
};

const updateTask = async (id, taskData) => {
  const db = getDb();
  const collection = db.collection('tasks');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: taskData }
  );
  return result.matchedCount > 0;
};

const deleteTask = async (id) => {
  const db = getDb();
  const collection = db.collection('tasks');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
