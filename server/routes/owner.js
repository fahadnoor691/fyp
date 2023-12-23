const path = require("path");
const express = require("express");

const router = express.Router();
const ownerController = require("../controllers/owner");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// const isAuth = require("../middleware/is_auth");

router.get("/owner/add-car", ownerController.getAddCar);

router.post("/owner/add-car", ownerController.postAddCar);

router.get("/owner/list/:ownerId", ownerController.carList);

router.post("/owner/delete-car/:carId", ownerController.postDeleteCar);

router.get("/edit-car/:carId", ownerController.getEditCar);

router.post("/edit-car/:carId", ownerController.postEditCar);

router.get("/owners-data", ownerController.OwnersAndCarsCount);

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ filePath: req.file.path });
});

module.exports = router;
