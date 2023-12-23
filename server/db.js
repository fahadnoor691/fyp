const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://fahadnoor039:nvckyhp6MaNygMm2@cluster0.sbiqd2o.mongodb.net/rolling-rentals",
    {}
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log(`Connected to MongoDB`);
  });

  connection.on("error", (err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
  });

  // Handle disconnection
  connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  // Close the connection when Node.js process exits
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}
connectDB();
module.exports = mongoose;
