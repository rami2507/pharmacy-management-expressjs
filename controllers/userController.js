const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/User");
const bcrypt = require("bcrypt");

// GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// DELETE ALL USERS
exports.deleteAllUsers = catchAsync(async (req, res, next) => {
  await User.deleteMany();
  res.status(204).json({
    status: "success",
    message: "Users are deleted successfuly",
  });
});

// DELETE A USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    messgae: "user has been delete successfuly",
  });
});

// MODIFY A USER
exports.modifyUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, req.body);
  res.status(200).json({
    status: "success",
    message: "User has been updated successfuly",
    data: {
      updatedUser,
    },
  });
});

// CREATE SELLER
exports.createSeller = catchAsync(async (req, res) => {
  const sellerData = {
    name: req.body.name,
    email: req.body.email,
    billingAddress: req.body.billingAddress,
    phone: req.body.phone,
    role: "seller",
    password: req.body.password,
  };
  sellerData.password = await bcrypt.hash(sellerData.password, 12);
  const newSeller = await User.create(sellerData);
  if (!newSeller) {
    return next(new AppError("An error has occured creating the seller", 403));
  }
  res.status(201).json({
    status: "success",
    message: "Seller has been created successfuly",
    data: {
      newSeller,
    },
  });
});
