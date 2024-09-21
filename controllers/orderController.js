const Order = require("../models/Order");
const AppError = require("../utils/AppError");
const asyncHandler = require("express-async-handler");

// CREATE AN ORDER
exports.createOrder = asyncHandler(async (req, res, next) => {
  const orderDetails = {
    medicamentName: req.body.medicamentName,
    qte: req.body.qte,
    supplier: req.body.supplier,
  };
  const newOrder = await Order.create(orderDetails);
  if (!newOrder) {
    return next(new AppError("There is an error creating the order"));
  }
  res.status(201).json({
    status: "success",
    message: "The order has been created successfuly",
    data: {
      newOrder,
    },
  });
});

// GET ALL ORDER
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("supplier");
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

// GET ONE ORDER
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      next(new AppError("There is an error fetching order with the given ID"))
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// UPDATE AN ORDER
exports.modifyOrder = asyncHandler(async (req, res, next) => {
  const modifiedOrder = await Order.findByIdAndUpdate(req.params.id, req.body);
  if (!modifiedOrder) {
    return next(new AppError("There is an error updating the order"));
  }
  res.status(200).json({
    status: "success",
    message: "Order has been modified successfuly",
    data: {
      modifiedOrder,
    },
  });
});

// DELETE ALL ORDERS

// DELETE AN ORDER
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
