const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A supplier must have a First Name"],
  },
  lastName: {
    type: String,
    required: [true, "A supplier must have a Last Name"],
  },
  emailAddress: {
    type: String,
    required: [true, "A supplier must have an Email Address"],
  },
  billingAddress: {
    type: String,
    required: [true, "A supplier must have a Billing Address"],
  },
  phone: {
    type: String,
    required: [true, "A supplier must have a Phone Number"],
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
