const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signup = catchAsync(async (req, res, next) => {
  let user = req.body;
  user.password = await bcrypt.hash(user.password, 12);
  const newUser = await User.create(user);
  // SEND RESPONSE
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please specify username and password", 404));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Can not find a user with that email", 404));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError("username or password is not correct", 404));
  }
  // SIGN TOKEN
  const token = jwt.sign({ userId: user._id }, "RAmi2002", {
    expiresIn: "900000000000000",
  });
  // SEND TOKEN AS A COOKIE
  res.cookie("jwt", token);
  // SEND RESPONSE TO CLIENT
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError("Your are not logged in! Please login to get access", 401)
    );
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, "RAmi2002");
  // 3) Check If User Still Exist
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token does no longer exist")
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// ONLY FOR RENDERED PAGES ,, NO ERRORS
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    try {
      // 2) Validate token
      const decoded = await promisify(jwt.verify)(token, "RAmi2002");
      // 3) Check If User Still Exists
      const currentUser = await User.findById(decoded.userId);
      if (!currentUser) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      res.locals.user = currentUser; // Optionally, store user data in locals
    } catch (err) {
      // Handle invalid or expired token
      console.error("Invalid or expired JWT token:", err);
    }
  }
  next();
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000), // Set expiration time to 10 seconds from now
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "Your are logged out successfuly",
  });
});
