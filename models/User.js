const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A user must have a name"] },
  email: { type: String, required: [true, "A user must have an email"] },
  billingAddress: {
    type: String,
    required: [true, "A user must have an address"],
  },
  phone: { type: String, required: [true, "A user must have a phone number"] },
  role: { type: String, enum: ["pharmacist", "manager", "seller"] },
  password: { type: String, required: [true, "A user must have a password"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
