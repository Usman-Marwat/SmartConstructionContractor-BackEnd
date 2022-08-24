const mongoose = require("mongoose");

// Defining Schema
const taskDetailSchema = new mongoose.Schema({
  taskId: { type: String },
  date: { type: String },
});

// Model
const TaskDetail = mongoose.model("taskDetail", taskDetailSchema);

module.exports = TaskDetail;
