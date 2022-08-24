const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/:id", async (req, res) => {
  let tasksdb = await Task.find({ ProjectId: req.params.id });
  res.send(tasksdb);
});
router.delete("/:id", async (req, res) => {
  await Task.deleteOne({ id: req.params.id });
  console.log("deleted");
  res.send();
});

router.get("/single/:id", async (req, res) => {
  let tasksdb = await Task.find({ id: req.params.id });
  console.log(tasksdb);
  res.send(tasksdb);
});

router.post("/", async (req, res) => {
  const taskdb = new Task(req.body);
  await taskdb.save();
  res.status(201).send(taskdb);
});

module.exports = router;
