const AppError = require("../utils/AppError");
const asyncHandler = require("express-async-handler");
const Medicament = require("./../models/Medicament");
const Sale = require("./../models/Sale");
const qr = require("qrcode");

// CREATE DETAILED SALE
exports.createSale = asyncHandler(async (req, res, next) => {
  // GET MEDICAMENTS FROM THE USER
  const { medicaments } = req.body;

  if (!Array.isArray(medicaments)) {
    return next(new AppError("Medicaments must be an array", 400));
  }

  let totalPrice = 0;

  // LOOP OVER MEDICAMENTS
  const medicamentPromises = medicaments.map(async (medicament) => {
    // QUERY FOR THE MEDICAMENT
    const isAvailable = await Medicament.findOne({ name: medicament.name });

    // CHECK IF THE MEDICAMENT IS FOUND!
    if (!isAvailable) {
      throw new AppError(`${medicament.name} is not available`, 404);
    }

    // CHECK FOR THE QUANTITY IS ENOUGH
    if (isAvailable.stockQte < medicament.qte) {
      throw new AppError(`Not enough stock for ${medicament.name}`, 400);
    }

    // CHECK IF ORDONNANCE IS REQUIRED
    if (
      req.params.type.split("/")[0] === "free-sale" &&
      isAvailable.parOrdonnance === true
    ) {
      throw new AppError(`Ordonnace is required for ${isAvailable.name}`, 400);
    }

    // PREPARE SALE DATA
    let date = new Date(Date.now());
    date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const sale = {
      medName: medicament.name,
      qte: medicament.qte,
      typeOfSale: "detail",
      date,
    };

    // CREATE THE SALE
    await Sale.create(sale);

    // CALCULATE PRICE AND UPDATE STOCK
    totalPrice = totalPrice + isAvailable.price * medicament.qte;
    isAvailable.stockQte = isAvailable.stockQte - medicament.qte;

    // SAVE DATA
    await isAvailable.save();
  });

  // SEND RESPONSE
  try {
    await Promise.all(medicamentPromises);
    res.status(201).json({
      status: "success",
      data: {
        totalPrice,
        medicaments,
      },
    });
  } catch (error) {
    next(error);
  }
});

// CREATE SALE 'GROS'
exports.createSaleGros = asyncHandler(async (req, res, next) => {
  let totalPrice = 0;
  // GET MEDICAMENTS FROM THE USER
  let date = new Date(Date.now());
  date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const medicamentDetails = {
    medName: req.body.medName,
    qte: req.body.qte,
    typeOfSale: "gros",
    date,
    pharmacy: req.body.pharmacy,
  };
  // CHECK FOR MEDICAMENT AVAILABILITY
  const medicament = await Medicament.findOne({
    name: medicamentDetails.medName,
  });
  if (!medicament) {
    return next(new AppError("This medicament is not available", 400));
  }
  // CHECK FOR STOCK
  if (medicament.stockQte < medicamentDetails.qte) {
    return next(
      new AppError("You dont have enough stock to make this sale", 400)
    );
  }
  totalPrice = medicament.price * medicamentDetails.qte;
  medicament.stockQte = medicament.stockQte - medicamentDetails.qte;

  await medicament.save();
  // SEND RESPONSE
  const sale = await Sale.create(medicamentDetails);
  if (!sale) {
    return next(new AppError("There is an error creating your sale"));
  }
  res.status(201).json({
    status: "success",
    data: {
      totalPrice,
      sale,
    },
  });
});

exports.getAllSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find();
  res.status(200).json({
    status: "success",
    results: sales.length,
    data: { sales },
  });
});

exports.deleteAllSales = asyncHandler(async (req, res) => {
  await Sale.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createQrCodeSale = asyncHandler(async (req, res) => {
  const data = "http://127.0.0.1:4000/medicaments/name=pp,qte=2&name=x,qte=2";

  // Generate the QR code as a Data URL
  qr.toString(data, (err, code) => {
    if (err) {
      return res.status(500).json({ error: "Error generating QR code" });
    } else {
      console.log(code);
    }
  });
});
