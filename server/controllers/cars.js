const Cars = require("../models/cars");

exports.getCarDescription = (req, res, next) => {
  res.render("shop/car-description", {
    pageTitle: "Add Desciption",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getCarDescriptionById = (req, res, next) => {
  const carId = req.params.carId;

  Cars.findById(carId)
    .then((car) => {
      if (!car || car.length === 0) {
        return res.status(404).json({ message: "No car found" });
      }
      return res.status(200).json({ car });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.getCarsListing = (req, res, next) => {
  req.session.isAuth = true;

  Cars.find()
    .then((cars) => {
      if (!cars || cars.length === 0) {
        return res.status(404).json({ message: "No car found" });
      }
      return res.status(200).json({ cars });
    })
    .catch((err) => {
      console.error("Error fetching cars:", error);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.main = (req, res, next) => {
  res.render("includes/landing", {
    pageTitle: "Add Product",
    isAuthenticated: req.session.isLoggedIn,
    path: "/",
  });
};

exports.filter = (req, res, next) => {
  const location = req.body.location;
  Cars.find({ location: location })
    .then((cars) => {
      res.render("shop/main", {
        cars: cars,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Maximilian",
        },
        createdAt: new Date(),
      },
    ],
  });
};
