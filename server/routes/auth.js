const path = require("path");
const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");

router.get("/get_all", authController.getAllUsers);

router.get("/owner/signup", authController.getOwnerSignUP);

router.get("/owner/login", authController.getOwnerLogin);

router.get("/login", authController.getLogin);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/send_email", authController.sendEmail);

router.post(
  "/update_owner_password/:userId",
  authController.changeOwnerPassword
);

router.post("/owner_send_email", authController.sendOwnerEmail);

router.post("/update_password/:userId", authController.changePassword);

router.post("/owner/signup", authController.postOwnerSignup);

router.post("/owner/login", authController.postOwnerLogin);

module.exports = router;
