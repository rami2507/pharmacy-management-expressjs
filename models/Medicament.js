const mongoose = require("mongoose");

const medicamentModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A medicament must have a Name."],
  },
  price: {
    type: Number,
    required: [true, "A medicament must have a price."],
  },
  expDate: {
    type: String,
    required: [true, "A medicament must have an Expiration Date."],
  },
  stockQte: {
    type: Number,
    required: true,
  },
  parOrdonnance: {
    type: Boolean,
    required: true,
  },
});

const Medicament = mongoose.model("Medicament", medicamentModel);

module.exports = Medicament;
