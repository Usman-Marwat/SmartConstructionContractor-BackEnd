const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const User = require("../models/user");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  // const user = usersStore.getUserByEmail(email);
  const user = await User.find({ email: email });
  if (!user[0] || user[0].password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: user.id, name: user.name, email },
    "jwtPrivateKey"
  );
  res.send(token);
});

module.exports = router;
