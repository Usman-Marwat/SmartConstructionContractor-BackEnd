const express = require("express");
const router = express.Router();
const Joi = require("joi");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const User = require("../models/user");
// const schema = Joi.object({
//   name: Joi.string().required().min(2),
//   email: Joi.string().email().required(),
//   password: Joi.string().required().min(5),
// });

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const userdb = await User.find({ email: email });
  if (userdb[0])
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  //const user = { name, email, password };
  let user = new User(req.body);
  user = await user.save();
  res.status(201).send(user);
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
