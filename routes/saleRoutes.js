const express = require("express");
const router = express.Router();
const saleController = require("./../controllers/saleController");

// CREATE A DETAIL SALE
router.post("/createSale/:type", saleController.createSale);
router.post("/createQrCodeSale", saleController.createQrCodeSale);

// CREATE SALE 'GROS'
router.post("/createSale/gros/gros", saleController.createSaleGros);

// GET ALL SALES
router.get("/allSales", saleController.getAllSales);

// DELETE ALL SALES
router.delete("/deleteAllSales", saleController.deleteAllSales);

module.exports = router;
