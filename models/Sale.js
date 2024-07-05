const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  medName: {
    type: String,
    required: true,
  },
  qte: {
    type: String,
    required: true,
  },
  typeOfSale: {
    type: String,
    default: "detail",
    enum: ["gros", "detail"],
  },
  date: {
    type: String,
    required: true,
  },
  pharmacy: {
    phName: {
      type: String,
    },
    phAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
