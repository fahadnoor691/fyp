require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Owner = require("../models/owner");
const Cars = require("../models/cars");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Function to generate a random string of specified length
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // Convert to hexadecimal format
    .slice(0, length); // Return required number of characters
};

// Usage
const secretKey = generateRandomString(64);

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

exports.getOwnerSignUP = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/ownerSignUp", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.getOwnerLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/ownerLogin", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.getSignUP = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/sign-up", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;
  const cnic = req.body.cnic;
  const number = req.body.number;
  const city = req.body.city;
  let token;
  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "Email, password, or confirmPassword is missing." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(409).json({ error: "Email already exists." });
      }
      // Proceed with user creation if the email doesn't exist
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          name: name,
          cnic: cnic,
          phone_number: number,
          city: city,

          booking: { items: [] },
        });

        return user.save().then(() => {
          const token = createToken(user._id);
          res.status(200).json({ message: "Sign Up successfully", token });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.error(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let token;
  let id;
  console.log(password);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid Email." });
      }

      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          token = createToken(user._id);
          id = user._id;
          return res.status(200).json({
            message: "Login successful",
            token,
            id,
          });
        }
        return res.status(401).json({ error: "Incorrect Password." });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

exports.postOwnerLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let token;
  let id;
  Owner.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email.");
        return res.redirect("/owner/login");
      }
      req.session.isLoggedIn = true;
      req.session.owner = user;
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          token = createToken(user._id);
          id = user._id;
          return res.status(200).json({
            message: "Login successful",
            token,
            id,
          });
        }
        return res.status(401).json({ error: "Incorrect Password." });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

exports.postOwnerSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let token;
  if (!email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "Email, password, or confirmPassword is missing." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  Owner.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(409).json({ error: "Email already exists." });
      }
      // Proceed with user creation if the email doesn't exist
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new Owner({
          email: email,
          password: hashedPassword,
        });

        return user.save().then(() => {
          const token = createToken(user._id);
          res.status(200).json({ message: "Sign Up successfully", token });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.error(err);
    });
};
// exports.postOwnerSignup = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;

//   Owner.findOne({ email: email })
//     .then((userDoc) => {
//       if (userDoc) {
//         req.flash("error", "Email already exist.");
//         return res.redirect("/owner/signup");
//       }
//       return bcrypt
//         .hash(password, 12)
//         .then((hashedPassword) => {
//           const user = new Owner({
//             email: email,
//             password: hashedPassword,
//           });
//           return user.save();
//         })
//         .then((result) => {
//           res.redirect("/owner/login");
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: "rollingrentals23@gmail.com",
    pass: "yqkvamfoljypmqpb",
  },
});

exports.sendEmail = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log(user);
        return res.status(404).json({ error: "Email not found." });
      }
      let url = `http://localhost:3001/update_password/${user._id}`;
      const mailOptions = {
        from: email,
        to: email,
        subject: "Reset Password Request",
        html: `<b>click on this link</b><br/> ${url}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Email sent successfully");
        }
      });
    })
    .catch((err) => {
      console.log("Internal Server Error");
      res.status(500).send("Internal Server Error");
    });
};

exports.changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.params.userId;

    if (!password || !userId) {
      return res
        .status(400)
        .json({ error: "Password and userId are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendOwnerEmail = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  Owner.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log(user);
        return res.status(404).json({ error: "Email not found." });
      }
      let url = `http://localhost:3001/update_owner_password/${user._id}`;
      const mailOptions = {
        from: email,
        to: email,
        subject: "Reset Password Request",
        html: `<b>click on this link</b><br/> ${url}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Email sent successfully");
        }
      });
    })
    .catch((err) => {
      console.log("Internal Server Error");
      res.status(500).send("Internal Server Error");
    });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.changeOwnerPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.params.userId;

    if (!password || !userId) {
      return res
        .status(400)
        .json({ error: "Password and userId are required" });
    }

    const user = await Owner.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
