const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Car = require("../models/cars");
const User = require("../models/user");
const Owner = require("../models/owner");

exports.bookCar = async (req, res) => {
  try {
    const {
      userId,
      carId,
      startdate,
      endDate,
      price,
      carName,
      carModel,
      carBrand,
      carSeats,
      carTransmission,
      carPrice,
    } = req.body;
    console.log(carPrice);
    // Validate if userId and carId are provided
    if (!userId || !carId) {
      return res.status(400).json({ error: "User ID and Car ID are required" });
    }

    // Check if the car exists in the database
    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ error: "Car not found" });
    }

    const existBooking = await Booking.findOne({ car: carId });
    if (existBooking) {
      return res.status(405).json({ error: "This car is already booked." });
    }

    // Create a new booking instance
    const newBooking = new Booking({
      user: userId,
      car: carId,
      startDate: startdate,
      endDate: endDate,
      price: price,
      carName: carName,
      carBrand: carBrand,
      carModel: carModel,
      carTransmission: carTransmission,
      carSeats: carSeats,
      carPrice: carPrice,
    });

    // Save the new booking
    await newBooking.save();
    console.log("Car Booked Successfully");
    return res
      .status(201)
      .json({ message: "Car booked successfully", newBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookings = (req, res) => {
  const id = req.params.id;
  Booking.find({ user: id })
    .then((bookings) => {
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No car found" });
      }
      return res.status(200).json({ bookings });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteBooking = (req, res) => {
  const bookingID = req.params.bookingID;
  Booking.findByIdAndDelete(bookingID).then((book) => {
    return res.status(200).json({ message: "Booking Deleted Successfully" });
  });
};

exports.editBooking = async (req, res) => {
  const { bookingId, startDate, endDate, price } = req.body;

  try {
    const update = await Booking.findByIdAndUpdate(
      bookingId,
      { startDate, endDate, price },
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ error: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.Stats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const owners = await Owner.countDocuments();
    const cars = await Car.countDocuments();
    const bookings = await Booking.countDocuments();

    return res.status(200).json({ users, owners, cars, bookings });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.adminBookings = (req, res) => {
  Booking.find()
    .then((bookings) => {
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No car found" });
      }
      return res.status(200).json({ bookings });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};
