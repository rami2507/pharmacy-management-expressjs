const express = require("express");
const supplierController = require("./../controllers/supplierController");
const router = express.Router();

// ADD (CREATE) SUPPLIER
router.post("/createSupplier", supplierController.createSupplier);
// GET ALL SUPPLIERS
router.get("/getAllSuppliers", supplierController.getAllSuppliers);
// DELETE A SUPPLIER
router.delete("/deleteSupplier/:id", supplierController.deleteSupplier);
// MODIFY A SUPPLIER
router.patch("/modifySupplier/:id", supplierController.modifySupplier);

module.exports = router;
