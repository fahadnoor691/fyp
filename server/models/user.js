const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    unique: true,
  },
  city: {
    type: String,
    required: false,
  },
  phone_number: {
    type: Number,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },

  booking: {
    items: [
      {
        carId: {
          type: Schema.Types.ObjectId,
          ref: "Cars",
          required: true,
        },
        total: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("user", userSchema);
