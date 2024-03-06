const mongoose = require("mongoose");
const { connection } = require("../config/database");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { getters: true, virtuals: false },
    toObject: { getters: true, virtuals: false },
  }
);

module.exports = connection.model("users", userSchema, "users");
