const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");

// CREATE AN ORDER
router.post("/createOrder", orderController.createOrder);

// GET ALL ORDERS
router.get("/allOrders", orderController.getAllOrders);

// DELETE AN ORDER
router.delete("/deleteOrder/:id", orderController.deleteOrder);

// MODIFY ORDER
router.patch("/modifyOrder/:id", orderController.modifyOrder);

module.exports = router;
