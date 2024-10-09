const mongoose = require("../database/db.js");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      cpfCnpj: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        default: "Member",
        required: true,
      }
    },
    { timestamps: true }
  )
);

module.exports = User;
