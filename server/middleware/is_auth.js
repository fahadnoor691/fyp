// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Auth token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     const { _id } = decodedToken;

//     const user = await User.findOne({ _id }).select("_id");

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "Request is not authorized" });
//   }
// };

// module.exports = requireAuth;
