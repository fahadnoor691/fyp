const Cars = require("../models/cars");
const multer = require("multer");
const Owner = require("../models/owner");

const upload = multer({ dest: "uploads/" });

exports.getAddCar = (req, res, next) => {
  res.render("pages/add-car", {
    pageTitle: "Add Car",
    isAuthenticated: req.session.isLoggedIn,
    editing: false,
  });
};

exports.postAddCar = (req, res, next) => {
  const brand = req.body.brand;
  const name = req.body.name;
  const price = req.body.price;
  const model = req.body.model;
  const transmission = req.body.transmission;
  const mileage = req.body.mileage;
  const seats = req.body.seats;
  const carType = req.body.carType; // Note: 'carType' spelling corrected
  const image = req.body.image;
  const location = req.body.location;
  const ownerId = req.body.ownerId; // Assuming req.owner holds the owner ID

  const car = new Cars({
    brand: brand,
    name: name,
    model: model,
    price: price,
    transmission: transmission,
    mileage: mileage,
    seats: seats,
    carType: carType,
    image: image,
    location: location,
    ownerId: ownerId,
  });

  car
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Car added successfully",
      });
      console.log("Car Added Successfully!");
    })
    .catch((err) => {
      res.status(500).json({ error: "Error in adding car" });
      console.log("Error in adding car!");
      console.log(err);
    });
};

//exports.getCarDescriptionById = (req, res, next) => {
//   const carId = req.params.carId;

//   Cars.findById(carId)
//     .then((car) => {
//       if (!car || car.length === 0) {
//         return res.status(404).json({ message: "No car found" });
//       }
//       return res.status(200).json({ car });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" });
//     });
// };

exports.carList = (req, res, next) => {
  let ownerid = req.params.ownerId;
  console.log(ownerid);
  Cars.find({ ownerId: ownerid })
    .then((cars) => {
      if (!cars || cars.length === 0) {
        return res.status(404).json({ message: "No car found" });
      }
      return res.status(200).json({ cars });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.postDeleteCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;
    console.log(carId);
    const deletedCar = await Cars.findByIdAndRemove(carId);
    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    console.log("DESTROYED PRODUCT");
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEditCar = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/owner/list");
  }
  const carId = req.params.carId;
  Cars.findById(carId)
    .then((car) => {
      if (!car) {
        return res.redirect("/owner/list");
      }
      res.render("pages/add-car", {
        editing: editMode,
        Cars: car,
        isAuthenticated: req.session.isLoggedIn,
      });
      console.log(car);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditCar = async (req, res, next) => {
  try {
    const {
      carId,
      brand,
      model,
      name,
      price,
      transmission,
      mileage,
      seats,
      carType,
      image,
      location,
    } = req.body;

    const updatedCar = await Cars.findByIdAndUpdate(
      carId,
      {
        brand,
        model,
        name,
        price,
        transmission,
        mileage,
        seats,
        carType: carType,
        image,
        location,
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json({ message: "Car updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.OwnersAndCarsCount = async (req, res) => {
  try {
    const ownersAndCarsCount = await Cars.aggregate([
      {
        $group: {
          _id: "$ownerId",
          numberOfCars: { $sum: 1 }, // Calculate the number of cars for each owner
        },
      },
      {
        $lookup: {
          from: "owners", // Name of the owners collection (adjust if needed based on your schema)
          localField: "_id",
          foreignField: "_id",
          as: "ownerData",
        },
      },
      {
        $project: {
          email: { $arrayElemAt: ["$ownerData.email", 0] }, // Include owner email
          numberOfCars: 1,
        },
      },
    ]);

    return res.status(200).json(ownersAndCarsCount);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
