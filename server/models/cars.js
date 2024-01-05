const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: false,
    required: false,
  },
  // ownerId: {
  //   type: Schema.Types.ObjectId, // Change the type to ObjectId
  //   ref: "owner", // Reference the 'owner' collection
  //   required: false,
  // },
});

module.exports = mongoose.model("Cars", carSchema);
