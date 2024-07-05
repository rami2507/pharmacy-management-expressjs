const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  medicamentName: {
    type: String,
    required: [true, "An order must have a Medicament Name"],
  },
  qte: {
    type: Number,
    required: [true, "An order must have a Quantity"],
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
