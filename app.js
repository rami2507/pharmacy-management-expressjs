const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const medicamentRoutes = require("./routes/medicamentRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const orderRoutes = require("./routes/orderRoutes");
const viewsRoutes = require("./routes/viewsRoutes");
const saleRoutes = require("./routes/saleRoutes");
const globalErrorHandling = require("./controllers/errorController");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const server = require("./server");
const dotenv = require("dotenv");
const AppError = require("./utils/AppError");

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("node_modules"));

// USE PUG TEMPLATE ENGINE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

// Set security HTTP Headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.jsdelivr.net"], // Allow scripts from self and cdn.jsdelivr.net
      // Add more directives as needed based on your application's requirements
    },
  })
);

// PATH TO ENV VARS
dotenv.config({ path: "./.env" });

// PARSE USER INPUTS
app.use(express.json());
app.use(cookieParser());

// API's
app.use("/api/v1/users", userRoutes); // USER ROUTES
app.use("/api/v1/medicaments", medicamentRoutes); // MEDICAMENT ROUTES
app.use("/api/v1/suppliers", supplierRoutes); // SUPPLIER ROUTES
app.use("/api/v1/orders", orderRoutes); // SUPPLIER ROUTES
app.use("/api/v1/sales", saleRoutes); // SALES ROUTES

// USER API's (VIEWS)
app.use("/", viewsRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Invalid route: ${req.originalUrl}`, 400));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandling);

// HANDLE UNHANDLED REJECTIONS
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err}`);
  server.close(() => {
    console.error("Shutting Down");
    process.exit(1);
  });
});

module.exports = app;
