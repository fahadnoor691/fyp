const path = require("path");
const express = require("express");

const router = express.Router();
const bookController = require("../controllers/booking");

router.post("/book-car", bookController.bookCar);

router.get("/get-bookings/:id", bookController.getBookings);

router.post("/delete-booking/:bookingID", bookController.deleteBooking);

router.post("/edit-booking/:bookingId", bookController.editBooking);

router.get("/stats", bookController.Stats);

router.get("/get-admin-bookings", bookController.adminBookings);

module.exports = router;
