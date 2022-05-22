const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [
      {
        fileName: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// id: 201,
// title: "Red jacket",
// images: [{ fileName: "jacket1" }],
// price: 100,
// categoryId: 5,
// userId: 1,
// location: {
//   latitude: 37.78825,
//   longitude: -122.4324,
// },
