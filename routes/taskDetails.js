const express = require("express");
const router = express.Router();
const TaskDetail = require("../models/taskDetail");

router.get("/:id", async (req, res) => {
  let taskDetailsDb = await TaskDetail.find({ taskId: req.params.id });
  res.send(taskDetailsDb);
});

router.put("/", async (req, res) => {
  console.log(req.body);
  const taskDetaildb = await TaskDetail.find({ taskId: req.body.task.id });
  console.log(taskDetaildb);
  if (taskDetaildb.length < 1) {
    const obj = { taskId: req.body.task.id, date: req.body.date };
    const tb = new TaskDetail(obj);
    await tb.save();
    res.status(201).send();
  }
  let doc = await TaskDetail.findOneAndUpdate(
    { taskId: req.body.task.id },
    { date: req.body.date },
    {
      new: true,
      upsert: true,
    }
  );
  res.status(201).send();
});

module.exports = router;
