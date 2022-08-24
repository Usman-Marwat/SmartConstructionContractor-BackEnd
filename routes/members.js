const express = require("express");
const router = express.Router();
const Member = require("../models/member");

router.get("/", async (req, res) => {
  let membersdb = await Member.find();
  res.send(membersdb);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const memberdb = new Member(req.body);
  await memberdb.save();
  res.status(201).send(memberdb);
});

module.exports = router;
