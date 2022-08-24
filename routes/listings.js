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

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
});

const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

router.get("/", async (req, res) => {
  const listingsdb = await Listing.find().sort({ createdAt: -1 });
  const listings = store.getListings();
  let resources = listings.map(listingMapper);
  // console.log(listingsdb[0]);
  console.log("----------------------------------------------------------");

  if (listingsdb.length > 0) {
    let resourcesdb = listingsdb.map(listingMapper);
    // console.log(resourcesdb[0]);
    resourcesdb = resourcesdb.filter((resource) => resource["$__"] !== null);
    resources = [...resourcesdb, ...resources];
  }
  console.log(resources);
  res.send(resources);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: req.body.price,
      categoryId: req.body.categoryId,
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    // if (req.body.location) listing.location = JSON.parse(req.body.location);
    // if (req.user) listing.userId = req.user.userId;
    console.log(listing);
    store.addListing(listing);

    const listingdb = new Listing(listing);
    await listingdb.save();
    const filePath = `${req.protocol}://${req.hostname}:9001/assets/${req.images[0]}_full.jpg`;

    res.status(201).send(listing);
  }
);

module.exports = router;
