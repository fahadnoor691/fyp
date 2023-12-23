const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const csurf = require("csurf");
const flash = require("connect-flash");
const cors = require("cors");

const Owner = require("./models/owner");
const User = require("./models/user");

const app = express();
app.use(cors());

const MONGOURL =
  "mongodb+srv://fahadnoor039:nvckyhp6MaNygMm2@cluster0.sbiqd2o.mongodb.net/fyp";

const store = new MongoDBStore({
  uri: MONGOURL,
  collection: "sessions",
});

// const csrfProtection = csurf();

app.set("view engine", "ejs");
app.set("views", "views");

const carRoutes = require("./routes/cars");
const AuthRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owner");
const bookingRoutes = require("./routes/bookings");

// store.on(
//   "error",
//   console.error.bind(console, "Error in MongoDB Session Store")
// );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "my key ",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use(csrfProtection);
app.use(flash());

// app.get("/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.use((req, res, next) => {
  if (!req.session.owner) {
    return next();
  }

  Owner.findById(req.session.owner._id)
    .then((owner) => {
      req.owner = owner;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();

//   next();
// });

app.use(carRoutes);
app.use(AuthRoutes);
app.use(ownerRoutes);
app.use(bookingRoutes);

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
// });

mongoose
  .connect(MONGOURL)
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
