const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const store = require("../store/listings");
const categoriesStore = require("../store/categories");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");
const Listing = require("../models/listing");
const Project = require("../models/Projects");

async function run() {
  try {
    const project = await Project.create({
      id: 4,
      title: "Charsadda Contract",
      description: "Do electric work in the basemnet of building",
      team: [
        {
          name: "Jama",
          photo:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774",
        },
        {
          name: "Alex",
          photo:
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062",
        },
        {
          name: "Catty",
          photo:
            "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772",
        },
      ],
      progress: 100,
      createdAt: "Dec 7 2012",
      tasks: 220,
      status: "completed",
    });
  } catch (error) {}
}

// run();

router.get("/", async (req, res) => {
  const projectsdb = await Project.find();
  res.send(projectsdb);
});

router.get("/:id", async (req, res) => {
  const projectdb = await Project.find({ id: req.params.id });
  res.send(projectdb[0]);
});

module.exports = router;
