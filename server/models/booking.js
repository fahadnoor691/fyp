// booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cars",
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carBrand: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  carTransmission: {
    type: String,
  },
  carSeats: {
    type: String,
  },
  carPrice: {
    type: Number,
    required: true,
  },
  // Add more properties as needed: dates, total price, etc.
});

module.exports = mongoose.model("Booking", bookingSchema);
