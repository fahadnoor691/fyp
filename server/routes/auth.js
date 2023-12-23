const path = require("path");
const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");

router.get("/owner/signup", authController.getOwnerSignUP);

router.get("/owner/login", authController.getOwnerLogin);

router.get("/login", authController.getLogin);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/send_email", authController.sendEmail);

router.post("/update_password/:userId", authController.changePassword);

router.post("/owner/signup", authController.postOwnerSignup);

router.post("/owner/login", authController.postOwnerLogin);

module.exports = router;
