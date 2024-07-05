const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Supplier = require("./../models/Supplier");

// ADD (CREATE) SUPPLIER
exports.createSupplier = catchAsync(async (req, res) => {
  const newSupplier = await Supplier.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Supplier has been created successfuly",
    data: {
      newSupplier,
    },
  });
});

// GET ALL Suppliers
exports.getAllSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await Supplier.find();
  res.status(200).json({
    status: "success",
    results: suppliers.length,
    data: {
      suppliers,
    },
  });
});

// DELETE ALL Suppliers
exports.deleteAllSuppliers = catchAsync(async (req, res, next) => {
  await Supplier.deleteMany();
  res.status(204).json({
    status: "success",
    message: "Suppliers are deleted successfuly",
  });
});

// DELETE A Supplier
exports.deleteSupplier = catchAsync(async (req, res, next) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "Supplier has been delete successfuly",
  });
});

// MODIFY Supplier
exports.modifySupplier = catchAsync(async (req, res, next) => {
  const modifiedSupplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Supplier has been modified successfuly",
    modifiedSupplier,
  });
});
